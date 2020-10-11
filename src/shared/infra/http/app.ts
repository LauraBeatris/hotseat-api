import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { errors as validationErrorsHandler } from 'celebrate';
import * as Sentry from '@sentry/node';

import errorsHandler from '@shared/infra/http/handlers/errors';
import '@shared/infra/database';
import uploadConfig from '@config/upload';
import { STATIC_FILES_ROUTE } from '@shared/constants/upload';

import routes from './routes';
import rateLimiterMiddleware from './middlewares/rateLimiter';

const app = express();

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  });
}

app.use(Sentry.Handlers.requestHandler());

app.use(cors());

app.use(express.json());
app.use(STATIC_FILES_ROUTE, express.static(uploadConfig.uploadFolder));
app.use(rateLimiterMiddleware);
app.use(routes);

app.use(Sentry.Handlers.errorHandler());
app.use(validationErrorsHandler());
app.use(errorsHandler);

export default app;
