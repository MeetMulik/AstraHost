import app from './app';
import logger from './utils/logger';
import { LogProcessor } from './workers/LogProcessor';

const port = process.env.PORT || 9000;

async function startServer() {
    try {
        const logProcessor: LogProcessor = app.get('logProcessor');

        const server = app.listen(port, () => {
            logger.info(`Server is running at http://localhost:${port}`);
        });

        await logProcessor.start();

        process.on('SIGTERM', async () => {
            logger.info('SIGTERM signal received: closing HTTP server');
            server.close(async () => {
                logger.info('HTTP server closed');
                await logProcessor.stop();
                process.exit(0);
            });
        });

        process.on('SIGINT', async () => {
            logger.info('SIGINT signal received: closing HTTP server');
            server.close(async () => {
                logger.info('HTTP server closed');
                await logProcessor.stop();
                process.exit(0);
            });
        });

    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();