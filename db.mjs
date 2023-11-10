import mongoose from 'mongoose';

console.log(process.env.DSN);
mongoose.connect(process.env.DSN);

// ingredient schema
const Ingredient = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true }
})

// recipe schema
const Recipe = new mongoose.Schema({
    name: { type: String, required: true },
    prepTime: { type: Number, required: true },
    ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }]
})

mongoose.model('Ingredient', Ingredient);
mongoose.model('Recipe', Recipe);