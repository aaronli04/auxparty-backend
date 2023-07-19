import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

export interface MessageResponse {
  message: string;
}

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'what up',
  });
});

export default app;