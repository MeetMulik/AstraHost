import express from 'express';
import dotenv from 'dotenv';
import indexRouter from './routes/index';
import errorHandler from './middlewares/errorHandler';
import logger from './utils/logger';
import cors from 'cors';
import { KafkaService } from './clients/KafkaClient';
import { ClickHouseService } from './clients/ClickHouseClient';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

const kafkaService = KafkaService.getInstance();
const clickHouseService = ClickHouseService.getInstance();

app.set('kafkaService', kafkaService);
app.set('clickHouseService', clickHouseService);


app.use('/', indexRouter);
app.use(errorHandler);

export default app;
