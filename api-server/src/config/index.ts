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
    AWS_ECS: {
        CLUSTER: string;
        TASK_DEFINITION: string;
        SUBNETS: string[];
        SECURITY_GROUPS: string[];
        CONTAINER_NAME: string;
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
    AWS_ECS: {
        CLUSTER: "",
        TASK_DEFINITION: "",
        SUBNETS: ["", "", ""],
        SECURITY_GROUPS: [""],
        CONTAINER_NAME: "",
    },
};

export default config;