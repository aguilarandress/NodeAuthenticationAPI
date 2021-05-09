import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import connectToDatabase from './config/database.js';
import 'colors';

import userRouter from './routes/api/users.js';
import authRouter from './routes/api/auth.js';

dotenv.config({ path: './config/config.env' });

connectToDatabase();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Morgan middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Setup static files
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

// Set up static files
const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(path.join(__dirname, '/client')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}...`.yellow.bold)
);
