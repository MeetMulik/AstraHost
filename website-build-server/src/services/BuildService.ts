import { exec } from 'child_process';
import logger from '../utils/logger';
import KafkaService from './KafkaService';

class BuildService {
    public static async runBuildProcess(outDirPath: string): Promise<void> {
        const kafkaService = KafkaService.getInstance();

        return new Promise<void>((resolve, reject) => {
            const p = exec(`
                cd ${outDirPath} && 
                npm install &&
                npm run build
            `);

            p.stdout?.on('data', async (data: Buffer | string) => {
                const logMessage = data.toString().trim();
                logger.info(logMessage);
                await kafkaService.publishLog(`Build output: ${logMessage}`);
            });

            p.stderr?.on('data', async (data: Buffer | string) => {
                const errorMessage = `Build error: ${data.toString().trim()}`;
                logger.error(errorMessage);
                await kafkaService.publishLog(errorMessage);
            });

            p.on('close', async (code: number | null) => {
                if (code !== 0) {
                    const errorMessage = `Build process exited with code ${code}`;
                    logger.error(errorMessage);
                    await kafkaService.publishLog(errorMessage);
                    reject(new Error(errorMessage));
                } else {
                    const successMessage = 'Build process completed successfully';
                    logger.info(successMessage);
                    await kafkaService.publishLog(successMessage);
                    resolve();
                }
            });
        });
    }
}

export default BuildService;