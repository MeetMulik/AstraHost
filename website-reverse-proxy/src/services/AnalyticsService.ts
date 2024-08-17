import { Request } from 'express';
import UAParser from 'ua-parser-js';
import geoip from 'geoip-lite';
import logger from '../utils/logger';
import { Redis } from 'ioredis';
import { AnalyticsData } from '../types/analytics-data';

export class AnalyticsCollector {
    private redis: Redis;
    private uaParser: UAParser;

    constructor(redisClient: Redis) {
        this.redis = redisClient;
        this.uaParser = new UAParser();
    }

    public async collectAnalyticsData(req: Request, projectId?: string): Promise<AnalyticsData> {
        const startTime = process.hrtime();
        try {
            const timestamp = new Date();
            const url = req.url || '';

            const ipAddress = this.getIpAddress(req);

            const userAgent = req.headers['user-agent'] || '';
            const referrer = req.headers.referer || '';


            // Rate limiting for multiple refreshes
            await this.checkRateLimit(ipAddress);

            // Parse user agent
            const { browserName, osName, deviceType } = this.parseUserAgent(userAgent);

            // Geolocate IP
            const { country, city } = await this.geoLocateIp(ipAddress);

            return {
                timestamp: timestamp.toISOString(),
                project_id: projectId || '',
                url,
                ip_address: ipAddress,
                user_agent: userAgent,
                referrer,
                country,
                city,
                device_type: deviceType,
                browser: browserName,
                os: osName,
                processing_time: this.getProcessingTime(startTime)
            };
        } catch (error) {
            logger.error('Error collecting analytics data:', error);
            throw error;
        }
    }

    private getIpAddress(req: Request): string {
        const xForwardedFor = (req.headers['x-forwarded-for'] as string) || '';
        const forwardedIps = xForwardedFor.split(',').map(ip => ip.trim());

        return forwardedIps[0] ||
            req.connection?.remoteAddress ||
            req.socket?.remoteAddress ||
            '';
    }

    private parseUserAgent(userAgent: string) {
        const result = this.uaParser.setUA(userAgent).getResult();
        return {
            browserName: result.browser.name?.toLowerCase() || 'other',
            osName: result.os.name?.toLowerCase() || 'other',
            deviceType: result.device.type || 'other'
        };
    }

    private async geoLocateIp(ipAddress: string): Promise<{ country: string, city: string }> {
        const cacheKey = `geolocation:${ipAddress}`;
        const cachedResult = await this.redis.get(cacheKey);

        if (cachedResult) {
            return JSON.parse(cachedResult);
        }

        const geo = geoip.lookup(ipAddress);
        const result = {
            country: geo?.country || '',
            city: geo?.city || ''
        };

        await this.redis.set(cacheKey, JSON.stringify(result), 'EX', 3600);
        return result;
    }

    private getProcessingTime(startTime: [number, number]): number {
        const endTime = process.hrtime(startTime);
        return endTime[0] * 1000 + endTime[1] / 1000000;
    }

    private async checkRateLimit(ipAddress: string): Promise<void> {
        const rateLimitKey = `ratelimit:${ipAddress}`;
        const rateLimitResult = await this.redis.incr(rateLimitKey);

        if (rateLimitResult === 1) {
            await this.redis.expire(rateLimitKey, 60); // 1 minute expiration
        }

        if (rateLimitResult > 100) { // 100 requests per minute limit
            logger.warn(`Rate limit exceeded for IP: ${ipAddress}`);
            throw new Error('Rate limit exceeded');
        }
    }
}