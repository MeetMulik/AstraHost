import express from 'express';
import dotenv from 'dotenv';
import proxyMiddleware from './middleware/proxyMiddleware';
import logger from './utils/logger';
import { KafkaProducerService } from './clients/KafkaClient';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;
const kafkaProducer = KafkaProducerService.getInstance();

async function startServer() {
    try {
        await kafkaProducer.connect();
        logger.info('Kafka producer connected successfully');

        app.use(proxyMiddleware);

        const server = app.listen(PORT, () => {
            logger.info(`Reverse Proxy Server is running on port ${PORT}`);
        });

        const gracefulShutdown = async () => {
            try {
                logger.info('Shutting down gracefully...');
                await kafkaProducer.disconnect();
                logger.info('Kafka producer disconnected.');
                server.close(() => {
                    logger.info('Server closed.');
                    process.exit(0);
                });
            } catch (error) {
                logger.error('Error during shutdown:', error);
                process.exit(1);
            }
        };

        process.on('SIGTERM', gracefulShutdown);
        process.on('SIGINT', gracefulShutdown);
    } catch (error) {
        logger.error('Failed to start the server:', error);
        process.exit(1);
    }
}

startServer();

export default app;