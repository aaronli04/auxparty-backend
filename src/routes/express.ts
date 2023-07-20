import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import paths from '../utils/paths';

export const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get(paths.HEALTH_CHECK, (req, res) => res.sendStatus(200))