import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import errorHandler from './utils/errorHandler';

const app = express();

app.use(helmet());
app.use(morgan('combined'));


app.use(errorHandler);

export default app;