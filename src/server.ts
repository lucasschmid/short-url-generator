import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import { sequelize } from './models/index.model';
import authRoutes from './routes/auth.routes';
import urlRoutes from './routes/url.routes';

const app = express();

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/', urlRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});