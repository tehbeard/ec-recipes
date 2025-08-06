import { recipeAdvancement, stonecutter, writeJSON } from "./utils.ts"; // @ts-ignore


// Need to rework this to be [ input, outputs[] ] tuple so we can mod it for stuff like bamboo mosaic
// using functions to generate the regular set and filtering to limit it.


const paintings = [
    "minecraft:alban",
"minecraft:aztec",
"minecraft:aztec2",
"minecraft:bomb",
"minecraft:burning_skull",
"minecraft:bust",
"minecraft:courbet",
"minecraft:creebet",
"minecraft:donkey_kong",
"minecraft:earth",
"minecraft:fighters",
"minecraft:fire",
"minecraft:graham",
"minecraft:kebab",
"minecraft:match",
"minecraft:pigscene",
"minecraft:plant",
"minecraft:pointer",
"minecraft:pool",
"minecraft:sea",
"minecraft:skeleton",
"minecraft:skull_and_roses",
"minecraft:stage",
"minecraft:sunset",
"minecraft:void",
"minecraft:wanderer",
"minecraft:wasteland",
"minecraft:water",
"minecraft:wind",
"minecraft:wither"
];


const storage_advancment_map = {};
paintings.forEach( (painting_id) => {
    // console.log( product(wood) );

    const filename = painting_id.split(":")[1];

    const data = {
        type: "minecraft:stonecutting",
        ingredient: {
          item: "minecraft:painting",
        },
        result: { 
            id: "minecraft:painting",
            Count: 1,
            components: {
                "minecraft:entity_data": { id: "minecraft:painting", variant: painting_id }
            }
        }
      };

    writeJSON(`./data/escapecraft/recipes/stonecutter/painting/${filename}.json`, data );

})

// Object.entries(storage_advancment_map).forEach( ([key, recipes]) => {

//     const advancement = recipeAdvancement(key, recipes);
//     writeJSON(`./data/escapecraft/advancement/recipes/stonecutter/painting/${key}.json`, advancement );
// })