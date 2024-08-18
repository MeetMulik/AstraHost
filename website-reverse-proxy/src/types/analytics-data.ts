export interface AnalyticsData {
    timestamp: string;
    project_id: string;
    url: string;
    ip_address: string;
    user_agent: string;
    referrer: string;
    country: string;
    city: string;
    device_type: string;
    browser: string;
    os: string;
    processing_time: number;
}