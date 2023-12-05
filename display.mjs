import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import {resolve, dirname} from 'path';
import {readFile, readdir} from 'fs';
import { fileURLToPath } from 'url';

export const readFromFS = function readFromFS(path, onReadingDone) {

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
                newRecipe.ingredients = fileInJson.ingredients;
                recipeList.push(newRecipe);
                // const recipe = Object.assign(fileInJson, Recipe.prototype);
                // recipeList.push(recipe);
  
                //If we are done with this LAST file, call the callback to signal a finish of reading all configs!
                if (count === nFiles) {
                    onReadingDone(recipeList);
                }
            })
        }
    });
};

