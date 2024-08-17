import * as path from 'path';
import config from './config';
import logger from './utils/logger';
import KafkaService from './services/KafkaService';
import S3Service from './services/S3Service';
import BuildService from './services/BuildService';

async function cleanup(): Promise<void> {
    logger.info('Starting cleanup...');
    await KafkaService.getInstance().publishLog('Starting cleanup...');
    await KafkaService.getInstance().disconnect();
    logger.info('Cleanup complete. Exiting.');
}

process.on('SIGINT', async () => {
    await cleanup();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await cleanup();
    process.exit(0);
});

async function init(): Promise<void> {
    try {
        await KafkaService.getInstance().connect();
        logger.info('Executing build script');
        await KafkaService.getInstance().publishLog('Starting Deployment');
        await KafkaService.getInstance().publishLog('Executing build script');

        const outDirPath = path.join(path.dirname(__dirname), 'output');
        logger.info(`Output directory: ${outDirPath}`);

        await BuildService.runBuildProcess(outDirPath);

        logger.info('Build Complete!');
        await KafkaService.getInstance().publishLog('Build Complete!');

        const distFolderPath = path.join(outDirPath, 'dist');
        await S3Service.getInstance().uploadToS3(distFolderPath);

        await KafkaService.getInstance().publishLog('Deployed to S3');
        logger.info('Deployed to S3');
    } catch (error) {
        logger.error('Error during script execution:', error);
        await KafkaService.getInstance().publishLog(`Error during script execution: ${(error as Error).message}`);
    } finally {
        await cleanup();
        process.exit(0);
    }
}

init().catch(async (error) => {
    logger.error('Unhandled error in init():', error);
    await KafkaService.getInstance().publishLog(`Unhandled error in init(): ${(error as Error).message}`);
    await cleanup();
    process.exit(1);
});