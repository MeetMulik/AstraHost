import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { PrismaClient } from '@prisma/client';
import httpProxy from 'http-proxy';

const prisma = new PrismaClient();
const proxy = httpProxy.createProxy();


const proxyMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const hostname = req.hostname;
        const subdomain = hostname.split('.')[0];
        logger.debug(subdomain)
        const project = await prisma.projects.findFirst({
            where: { sub_domain: subdomain },
        });

        if (!project) {
            logger.warn(`Project not found for subdomain: ${subdomain}`);
            res.status(404).send('Project not found');
            return;
        }
        console.log('project', project)

        const resolvesTo = `${process.env.BASE_PATH}/${project.projectId}`;
        console.log('Proxying request to:', resolvesTo);

        proxy.web(req, res, { target: resolvesTo, changeOrigin: true }, (error) => {
            if (error) {
                next(error);
            }
        });

        proxy.on("proxyReq", (proxyReq, req, res) => {
            const url = req.url;
            if (url === "/") {
                proxyReq.path += "index.html";
                logger.info(proxyReq)
            }
        });

    } catch (error) {
        logger.error('Middleware error:', error);
        next(error);
    }
};

export default proxyMiddleware;