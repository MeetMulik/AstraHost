import { ECSClient } from "@aws-sdk/client-ecs"
import config from "../../config"

export const ecsClient = new ECSClient({
    region: config.AWS.REGION,
    credentials: {
        accessKeyId: config.AWS.ACCESS_KEY_ID,
        secretAccessKey: config.AWS.SECRET_ACCESS_KEY
    }
})