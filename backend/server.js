import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import itemRoutes from './routes/itemRoutes.js';
import suggestionRoutes from './routes/suggestionRoutes.js';
import priceRoutes from './routes/priceRoutes.js';

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/items', itemRoutes);
app.use('/api/suggestions', suggestionRoutes);
app.use('/api/prices', priceRoutes);


app.listen(port, () => console.log(`🚀 Server started on port ${port}`));
