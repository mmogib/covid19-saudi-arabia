import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { join } from 'path';
import favicon from 'serve-favicon';
// local import
import apiRouter from './routes/api';
import {
  errorMiddleware,
  HttpException,
} from './utils/error-handling';
import jwtcheck from './auth/auth0';

const app = express();
const port = process.env.PORT || 3000;
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(join(__dirname, '../public')));
app.use(favicon(join(__dirname, '../public', 'favicon-32x32.png')));

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('tiny'));

app.listen(port, () => {
  console.log(`Listening on port ${port} ...`);
});

app.use('/api', apiRouter);
app.use('/', (_req, _res, next) => {
  next(new HttpException(404, 'not found'));
});
app.use(errorMiddleware);
