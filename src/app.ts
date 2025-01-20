import express from 'express';
import studentRoutes from './routes/studentRoutes';
import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();
app.use(express.json());

app.use('/students', studentRoutes);


app.use(errorMiddleware);


export default app;