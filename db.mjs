import mongoose from 'mongoose';

import { config } from 'dotenv';
config();

console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

// ingredient schema
const Ingredient = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true }
});

// recipe schema
const Recipe = new mongoose.Schema({
    name: { type: String, required: true },
    altName: { type: String, required: true },
    prepTime: { type: Number, required: true },
    description: { type: String, required: true },
    intro: { type: String, required: true },
    ingredients: [{
        name: String,
        amt: Number,
        unit: String
        }],
    steps: [{ type: String }]
    // ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }] the schemas are linked but not in this way
});

// use of 2 mongoose schemas
mongoose.model('Ingredient', Ingredient);
mongoose.model('Recipe', Recipe);