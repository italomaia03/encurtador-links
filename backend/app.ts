import express from 'express';
import {router as urlRouter} from './routes/url.routes';
import {router as healthCheckRouter} from './routes/health.routes';

const app = express();

app.use(express.json());
app.use(urlRouter);
app.use(healthCheckRouter);

export default app;