The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines.

# Hatch

## Overview

Tired of making the same few recipes over and over? Can't think of ways to switch up your diet? Introducing Hatch, your personal cooking companion!

Hatch is a web app that will allow users to find recipes based on ingredients they select. Users can browse vetted recipes based on tags or filter based on the ingredients they'd like to use.

## Data Model

The application will store Ingredients and Recipes

* each recipe has a list of references to multiple Ingredients
* Ingredients can be repeated across recipes
* will add more functionalities (e.g. tags, doubling/tripling recipes, etc.) if time permits

An Example Ingredient:

```javascript
{
  name: "all-purpose flour",
  quantity: 1.5,
  unit: "cup"
}
```

An Example Recipe:

```javascript
{
  name: "pancakes",
  prepTime: 20,
  ingredients: [
    { name: "all-purpose flour", quantity: 1.5, unit: "cup" },
    { name: "egg", quantity: 2, unit: "egg" }
    ] // array of references to Ingredient documents
}
```

## [Link to Commented First Draft Schema](db.mjs) 

## Wireframes

/recipes/query - page for showing recipes filtered by query

![list create](documentation/list-create.png)

/recipes - page for showing all recipes

![list](documentation/list.png)

/recipes/slug - page for showing specific recipe

![list](documentation/hatch-recipes-slug.png)

## Site map

![sitemap](documentation/hatch-sitemap.drawio.png)

## User Stories or Use Cases

1. as a user, I can view all the recipes on the site
2. as a user, I can filter the recipes on the site by ingredients
3. as a user, I can view an individual recipe

## Research Topics

* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * And account has been made for testing; I'll email you the password
    * see <code>cs.nyu.edu/~jversoza/ait-final/register</code> for register page
    * see <code>cs.nyu.edu/~jversoza/ait-final/login</code> for login page
* (4 points) Perform client side form validation using a JavaScript library
    * see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code>
    * if you put in a number that's greater than 5, an error message will appear in the dom
* (6 points) React
    * Planning to use React as frontend framework, will be challenging to deploy

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit)


## [Link to Initial Main Project File](app.mjs) 

## Annotations / References Used

(__TODO__: list any tutorials/references/etc. that you've based your code off of)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)

