import express from 'express';
import {router as urlRouter} from './routes/url.routes';
import cors from 'cors';
import {router as healthCheckRouter} from './routes/health.routes';
import { envConfig } from './config/env.config';
import { ErrorHandler } from './middlewares/error-handler';

const app = express();

app.use(express.json());
if (envConfig.NODE_ENV === 'local'){
  console.log(envConfig.NODE_ENV);
  app.use(cors());
}
app.use("/api/v1",urlRouter);
app.use(healthCheckRouter);
app.use(ErrorHandler);

export default app;