import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'path';
import * as mime from 'mime-types';
import config from '../config';
import logger from '../utils/logger';

class S3Service {
    private static instance: S3Service;
    private s3Client: S3Client;

    private constructor() {
        this.s3Client = new S3Client({
            region: config.AWS.REGION,
            credentials: {
                accessKeyId: config.AWS.ACCESS_KEY_ID,
                secretAccessKey: config.AWS.SECRET_ACCESS_KEY,
            },
        });
    }

    public static getInstance(): S3Service {
        if (!S3Service.instance) {
            S3Service.instance = new S3Service();
        }
        return S3Service.instance;
    }

    public async uploadToS3(distFolderPath: string): Promise<void> {
        const distFolderContents = fs.readdirSync(distFolderPath, { recursive: true });

        for (const file of distFolderContents) {
            const filePath = path.join(distFolderPath, file as string);
            if (fs.lstatSync(filePath).isDirectory()) {
                continue;
            }

            const command = new PutObjectCommand({
                Bucket: config.S3_BUCKET,
                Key: `__outputs/${config.PROJECT_ID}/${file}`,
                Body: fs.createReadStream(filePath),
                ContentType: mime.lookup(filePath) || 'application/octet-stream',
            });

            await this.s3Client.send(command);
            logger.info(`Uploaded: __outputs/${config.PROJECT_ID}/${file}`);
        }
    }
}

export default S3Service;