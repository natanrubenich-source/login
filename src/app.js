import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './router/authRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});