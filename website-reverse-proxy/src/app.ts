import express from 'express';
import errorHandler from './utils/errorHandler';
import dotenv from 'dotenv';
import proxyMiddleware from './middleware/proxyMiddleware';
dotenv.config();

const app = express();

app.use(proxyMiddleware);

app.use(errorHandler);

export default app;