import { Request, Response, NextFunction } from 'express';
import logger from './logger';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    logger.error('Application error:', err);
    res.status(500).send('Internal Server Error');
};

export default errorHandler;