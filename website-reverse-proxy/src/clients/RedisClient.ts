import Redis, { Redis as RedisClient } from 'ioredis';
import config from '../config';

export class RedisService {
    private static instance: RedisService;
    private redis: RedisClient;

    constructor() {
        this.redis = new Redis(config.REDIS.REDIS_CONNECTION_STRING);
    }

    public static getInstance(): RedisService {
        if (!RedisService.instance) {
            RedisService.instance = new RedisService();
        }
        return RedisService.instance;
    }

    public getRedisClient(): RedisClient {
        return this.redis;
    }
}
