import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import httpProxy from 'http-proxy';
import { PrismaClient } from '@prisma/client';

const proxy = httpProxy.createProxy();
const prisma = new PrismaClient();

const BASE_PATH = "https://ast-storage.s3.ap-south-1.amazonaws.com/__outputs";

proxy.on("proxyReq", (proxyReq, req, res) => {
    const url = req.url;
    if (url === "/") {
        proxyReq.path += "index.html";
        logger.info(proxyReq);
    }
});

const proxyMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const hostname = req.hostname;
        const subdomain = hostname.split('.')[0];
        logger.debug(subdomain);

        const project = await prisma.projects.findFirst({
            where:{
                sub_domain:subdomain
            }
        })

        const resolvesTo = `${BASE_PATH}/${project?.projectId}`;
        console.log('Proxying request to:', resolvesTo);

        proxy.web(req, res, { target: resolvesTo, changeOrigin: true }, (error) => {
            if (error) {
                next(error);
            }
        });
    } catch (error) {
        logger.error('Middleware error:', error);
        next(error);
    }
};

export default proxyMiddleware;