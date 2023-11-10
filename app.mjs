import './config.mjs';
import './db.mjs';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// temporarily using hbs
app.set('view engine', 'hbs');

const Ingredient = mongoose.model('Ingredient');
const Recipe = mongoose.model('Recipe');

// body parser (req.body)
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(process.env.PORT ?? 3000);