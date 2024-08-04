import app from './app';
import logger from './utils/logger';

const port = process.env.PORT || 9000;

const server = app.listen(port, () => {
    logger.info(`Server is running at http://localhost:${port}`);
});

process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        logger.info('HTTP server closed');
    });
});

process.on('SIGINT', () => {
    logger.info('SIGINT signal received: closing HTTP server');
    server.close(() => {
        logger.info('HTTP server closed');
    });
});
