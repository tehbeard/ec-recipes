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


const makeBlast = (ingredient, result, subDir = null) => {
    Deno.mkdir(`./data/escapecraft/recipe/blasting/revert/${subDir ?? result}/`,{recursive: true})
    .then(() =>
    writeJSON(`./data/escapecraft/recipe/blasting/revert/${subDir ?? result}/${ingredient}.json`,
        recipeBlasting("minecraft:" + ingredient, "minecraft:" + result)
    )
    );
}

COLOURS.forEach( col => makeBlast(col + "_stained_glass","glass",));
COLOURS.forEach( col => makeBlast(col + "_stained_glass_pane","glass_pane"));

COLOURS.forEach( col => makeBlast(col + "_glazed_terracotta", col + "_terracotta","terracotta"));
COLOURS.forEach( col => makeBlast(col + "_terracotta", "terracotta"));

makeBlast("deepslate","cobbled_deepslate");


const blockData = Object.keys(JSON.parse(new TextDecoder().decode(Deno.readFileSync("./ingest/blocks.json"))));

const stoneRevert = (base: string, result: string|null = null) => {
    blockData
    .filter( id => id.includes("_" + base ) || id.includes(base + "_"))
    .filter( id => !id.includes("_slab"))
    .filter( id => id != "minecraft:" + base)
    .forEach( id => makeBlast(id.split(":")[1],result ?? base));
}

stoneRevert("tuff");

stoneRevert("deepslate","cobbled_deepslate");

stoneRevert("andesite");
stoneRevert("granite");
stoneRevert("diorite");

stoneRevert("blackstone");
stoneRevert("sulfur");
stoneRevert("cinnabar");

makeBlast("glow_ink_sac","ink_sac");


// writeJSON(`./data/escapecraft/recipe/blasting/gunpowder.json`,
//     {...recipeBlasting("minecraft:flint", "minecraft:gunpowder") , cookingtime: 800}
// )

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