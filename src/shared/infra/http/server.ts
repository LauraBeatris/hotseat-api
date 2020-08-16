import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { errors as validationErrorsHandler } from 'celebrate';

import errorsHandler from '@shared/infra/http/handlers/errors';
import '@shared/infra/database';
import uploadConfig from '@config/upload';
import { STATIC_FILES_ROUTE } from '@shared/constants/upload';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(STATIC_FILES_ROUTE, express.static(uploadConfig.uploadFolder));
app.use(routes);
app.use(validationErrorsHandler());
app.use(errorsHandler);

// eslint-disable-next-line no-console
app.listen(process.env.PORT, () => console.log('🚀 Server Launched'));
