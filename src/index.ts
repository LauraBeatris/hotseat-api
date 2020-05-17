import dotenv from 'dotenv';
import express from 'express';

import routes from './routes';

import './database';
import uploadConfig from './config/upload';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(8080, () => console.log('🚀 Server Launched'));
