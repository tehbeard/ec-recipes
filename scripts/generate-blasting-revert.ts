import { recipeAdvancement, recipeBlasting, stonecutter, stonecutterTagRecipe, writeJSON } from "./utils.ts";

const COLOURS = [
    "black",
    "blue",
    "brown",
    "cyan",
    "gray",
    "green",
    "light_blue",
    "light_gray",
    "lime",
    "magenta",
    "orange",
    "pink",
    "purple",
    "red",
    "white",
    "yellow"
];


const makeBlast = (ingredient, result) => {
    writeJSON(`./data/escapecraft/recipe/blasting/revert/${ingredient}.json`,
        recipeBlasting("minecraft:" + ingredient, "minecraft:" + result)
    )
}

COLOURS.forEach( col => makeBlast(col + "_stained_glass","glass"));
COLOURS.forEach( col => makeBlast(col + "_stained_glass_pane","glass_pane"));

COLOURS.forEach( col => makeBlast(col + "_glazed_terracotta", col + "_terracotta"));
COLOURS.forEach( col => makeBlast(col + "_terracotta", "terracotta"));



// const wood_advancment_map = {};
// wood_types.forEach( ([wood, product, qty]) => {
//     // console.log( product(wood) );

//     const filename = wood + "_to_" + product;

//     const data = stonecutter(wood, product, qty);

//     writeJSON(`./data/escapecraft/recipe/stonecutter/wood/${filename}.json`, data );

//     if( !Array.isArray(wood_advancment_map[wood]))
//     {
//         wood_advancment_map[wood] = [];
//     }
//     wood_advancment_map[wood].push(`escapecraft:stonecutter/wood/${filename}`);

// })

// Object.entries(wood_advancment_map).forEach( ([key, recipes]) => {

//     const advancement = recipeAdvancement(key, recipes);
//     writeJSON(`./data/escapecraft/advancement/recipes/stonecutter/wood/${key}.json`, advancement );
// })