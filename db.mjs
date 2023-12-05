import mongoose from 'mongoose';

console.log(process.env.DSN);
mongoose.connect(process.env.DSN);

// ingredient schema
const Ingredient = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true }
})

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
    // ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }]
})

mongoose.model('Ingredient', Ingredient);
mongoose.model('Recipe', Recipe);