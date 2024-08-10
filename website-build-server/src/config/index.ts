import path from "path";

interface Config {
    PROJECT_ID: string;
    DEPLOYMENT_ID: string;
    KAFKA: {
        BROKERS: string[];
        SASL: {
            USERNAME: string;
            PASSWORD: string;
            MECHANISM: string;
        };
    };
    AWS: {
        REGION: string;
        ACCESS_KEY_ID: string;
        SECRET_ACCESS_KEY: string;
    };
    S3_BUCKET: string;
}

const config: Config = {
    PROJECT_ID: process.env.PROJECT_ID || '',
    DEPLOYMENT_ID: process.env.DEPLOYMENT_ID || '',
    KAFKA: {
        BROKERS: [""],
        SASL: {
            USERNAME: "",
            PASSWORD: "",
            MECHANISM: "",
        },
    },
    AWS: {
        REGION: "",
        ACCESS_KEY_ID: "",
        SECRET_ACCESS_KEY: "",
    },
    S3_BUCKET: "",
};

export default config;