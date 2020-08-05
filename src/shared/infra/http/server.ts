import 'reflect-metadata';
import 'express-async-errors';

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import errorsHandler from '@shared/infra/http/handlers/errors';
import '@shared/infra/database';
import uploadConfig from '@config/upload';
import routes from './routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(routes);
app.use(errorsHandler);

// eslint-disable-next-line no-console
app.listen(8080, () => console.log('🚀 Server Launched'));
