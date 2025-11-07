import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from './db';
import todosRouter from './routes/todos';
import { getGreeting } from '@todo-app/shared'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todosRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Todo API is running' });
});

// Root: redirect to health for a friendly default and avoid "Cannot GET /"
app.get('/', (req, res) => {
  res.redirect('/health');
});

// Preserve info route that returns a small API description and shared greeting
app.get('/info', (req, res) => {
  res.json({ name: 'Todo List API', version: '1.0.0', message: getGreeting() });
});

// Start server
const startServer = async () => {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();