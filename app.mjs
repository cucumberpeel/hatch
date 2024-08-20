import './config.mjs';
import './db.mjs';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import {resolve, dirname} from 'path';
import {readFile, readdir} from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'hbs');

const Ingredient = mongoose.model('Ingredient');
const Recipe = mongoose.model('Recipe');

// body parser (req.body)
app.use(express.urlencoded({ extended: false }));

// global lists
const ingredientList = [];
const recipeList = [];

// beginning of function definitions

// read in recipes from json files
function readRecipesFromFS(path, onReadingDone) {

    readdir(path, (err, files) => {
        let count = 0;
        //Get the # of files in the current directory
        const nFiles = files.length;
  
        //Iterate through every filename and read them
        for (const fileName of files) {
            const filePath = resolve(path, fileName);
  
            readFile(filePath, (err, data) => {
                ++count;
  
                //Throw error if input file cannot be opened
                if (err) {
                    throw err;
                }
  
                //Parse file content to JSON objects
                const fileInJson = JSON.parse(data.toString());
  
                // Cast JSON objects to Recipe Objects
                const newRecipe = new Recipe();
                newRecipe.name = fileInJson.name;
                newRecipe.altName = fileInJson.altName;
                newRecipe.prepTime = fileInJson.prepTime;
                newRecipe.description = fileInJson.description;
                newRecipe.intro = fileInJson.intro;
                newRecipe.ingredients = fileInJson.ingredients; // list of objects
                newRecipe.steps = fileInJson.steps; // list of strings
                recipeList.push(newRecipe);
                // const recipe = Object.assign(fileInJson, Recipe.prototype);
                // recipeList.push(recipe);
  
                //If we are done with this LAST file, call the callback to signal a finish of reading all configs
                //If we are done with this LAST file, call the callback to signal a finish of reading all configs
                if (count === nFiles) {
                    onReadingDone(recipeList);
                }
            });
        }
    });
}

// usage of higher order function
const renderRecipe = function(name, recipeList, req, res) {
    let result = "";
    for (const r of recipeList) {
        if (r.name === name) {
            result = r;
            break;
        }
    }
    if (result) {
        // form 3 - scale ingredients
        let factoredIngredients = [];
        if (req.query['factor']) {
            for (const i of result.ingredients) {
                factoredIngredients.push({name: i.name, amt: i.amt * req.query['factor'], unit: i.unit});
            }
        }
        else {
            factoredIngredients = result.ingredients;
        }
        return res.render('recipe', {
            name: result.name,
            altName: result.altName,
            prepTime: result.prepTime,
            description: result.description,
            intro: result.intro,
            ingredients: factoredIngredients, // still a list of objects
            steps: result.steps // still a list of strings
        });
    }
    else {
        return res.render('error');
    }
};

// usage of higher order function
const renderIngredient = function(name, ingredientList, req, res) {
    let result = "";
    for (const i of ingredientList) {
        if (i.name === name) {
            result = i;
            break;
        }
    }

    if (result) {
        return res.render('ingredient', {
            name: result.name,
            category: result.category,
            description: result.description
        });
    }
    else {
        return res.render('error');
    }
};

// filter recipes by ingredients on the home page
// usage of map/reduce/filter
// input validation/stability/security
function filterRecipesByIngredient(req, recipeList) {
    if (req.query['searchQ']) {
        const newList = [];
        for (let i = 0; i < recipeList.length; i++) {
            // recipeList[i]['ingredients'] should be array of objects
            const ingredients = recipeList[i]['ingredients'].map((i) => i['name']);
            // console.log(ingredients);
            if (ingredients.includes(req.query['searchQ'])) {
                newList.push(recipeList[i]);
            }
        }
        return newList;
    }
    else {
        return recipeList;
    }
}

// use of map/reduce/filter
// input validation/stability/security
function filterRecipesByKeyword(req, recipeList) {
    if (req.query['recipeQ']) {
        const newList = [];
        const recipeNames = recipeList.map((r) => r.name);
        for (let i = 0; i < recipeNames.length; i++) {
            if (recipeNames[i].includes(req.query['recipeQ'])) {
                newList.push(recipeList[i]);
            }
        }
        return newList;
    }
    else {
        return recipeList;
    }
}

// read in ingredients from json files
function readIngredientsFromFS(path, onReadingDone) {

    readdir(path, (err, files) => {
        let count = 0;
        //Get the # of files in the current directory
        const nFiles = files.length;
  
        //Iterate through every filename and read them
        for (const fileName of files) {
            const filePath = resolve(path, fileName);
  
            readFile(filePath, (err, data) => {
                ++count;
  
                //Throw error if input file cannot be opened
                if (err) {
                    throw err;
                }
  
                //Parse file content to JSON objects
                const fileInJson = JSON.parse(data.toString());
  
                // Cast JSON objects to Recipe Objects
                const newIngredient = new Ingredient();
                newIngredient.name = fileInJson.name;
                newIngredient.category = fileInJson.category;
                newIngredient.description = fileInJson.description;
                ingredientList.push(newIngredient);
                // const recipe = Object.assign(fileInJson, Recipe.prototype);
                // recipeList.push(recipe);
  
                //If we are done with this LAST file, call the callback to signal a finish of reading all configs!
                if (count === nFiles) {
                    onReadingDone(ingredientList);
                }
            });
        }
    });
}
// end of function definitions

// beginning of file reading
// read in list of ingredients
const ingredientReadingPath = path.resolve(__dirname, './saved-ingredients');
readIngredientsFromFS(ingredientReadingPath, (ingredientList) => {
    // console.log(ingredientList);
});

// read in list of recipes
const recipeReadingPath = path.resolve(__dirname, './saved-recipes');
readRecipesFromFS(recipeReadingPath, (recipeList) => {
    // console.log(recipeList);
});
// end of file reading

app.get('/', (req, res) => {
    if (req.query['searchQ']) {
        const newList = filterRecipesByIngredient(req, recipeList);
        res.render('home', {
            title: "Recipes that include " + req.query['searchQ'],
            "recipe": newList
        });
    }
    else if (req.query['recipeQ']) {
        const newList = filterRecipesByKeyword(req, recipeList);
        res.render('home', {
            title: req.query['recipeQ'] + " Recipes",
            "recipe": newList
        });
    }
    else {
        res.render('home', {
            title: "Recipes",
            "recipe": recipeList
        });
    }
});

// route paths based on recipe titles
app.get('/recipe/*', (req, res) => {
    const recipeName = req.path.split("/recipe/")[1];
    // validate recipe
    renderRecipe(recipeName, recipeList, req, res);
});

// route paths based on ingredient names
app.get('/ingredient/*', (req, res) => {
    const ingredientName = req.path.split("/ingredient/")[1];
    // validate ingredient
    renderIngredient(ingredientName, ingredientList, req, res);
});
// end of path routing

app.listen(process.env.PORT ?? 3000);