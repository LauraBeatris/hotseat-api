import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';

import routes from './routes';
import errorHandler from './handlers/errors';

import './database';
import uploadConfig from './config/upload';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(errorHandler);

app.listen(8080, () => console.log('🚀 Server Launched'));
