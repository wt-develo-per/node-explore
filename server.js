import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { sequelize } from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

const app = express();
dotenv.config();

// Test DB connection & create tables
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        await sequelize.sync({ alter: true }); 
        // or { force: true } → drops & recreates tables
        console.log('Tables synced.');
    } catch (error) {
        console.error('Unable to connect to DB:', error);
    }
})();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample route

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// User routes
app.use('/api/users', userRoutes);

// category routes
app.use('/api/categories', categoryRoutes);

// Start the server

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
if(err){
    console.error('Error starting server:', err);
    return;
}
    console.log(`Server is running on port ${PORT}`);
});