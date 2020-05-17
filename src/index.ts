import dotenv from 'dotenv';

import express from 'express';
import routes from './routes';

import './database';

dotenv.config();

const app = express();

app.use(express.json());
app.use(routes);

app.listen(8080, () => console.log('🚀 Server Launched'));
