import express from 'express';
import dotenv from 'dotenv';
import errorHandler from './utils/errorHandler';
import proxyMiddleware from './middleware/proxyMiddleware';
import logger from './utils/logger';

dotenv.config();

const app = express();

app.use(proxyMiddleware);

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    logger.info(`Reverse Proxy Server is running on port ${PORT}`);
});

export default app;