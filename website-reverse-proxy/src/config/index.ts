interface Config {
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
    REDIS: {
        REDIS_CONNECTION_STRING: string;
    }
}

const config: Config = {
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
    REDIS:{
        REDIS_CONNECTION_STRING:""
    }
};

export default config;