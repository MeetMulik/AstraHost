import dotenv from 'dotenv';
import app from './app';
import logger from './utils/logger';

dotenv.config();

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
    logger.info(`Reverse Proxy Server is running on port ${PORT}`);
});

process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        logger.info('HTTP server closed');
    });
});