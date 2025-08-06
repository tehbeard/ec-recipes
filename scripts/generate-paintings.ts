import { recipeAdvancement, stonecutter, writeJSON } from "./utils.ts"; // @ts-ignore


// Need to rework this to be [ input, outputs[] ] tuple so we can mod it for stuff like bamboo mosaic
// using functions to generate the regular set and filtering to limit it.


const paintings = [
    "minecraft:kebab",
    "minecraft:aztec",
    "minecraft:alban",
    "minecraft:aztec2",
    "minecraft:bomb",
    "minecraft:plant",
    "minecraft:wasteland",
    "minecraft:pool",
    "minecraft:courbet",
    "minecraft:sea",
    "minecraft:sunset",
    "minecraft:creebet",
    "minecraft:wanderer",
    "minecraft:graham",
    "minecraft:match",
    "minecraft:bust",
    "minecraft:stage",
    "minecraft:void",
    "minecraft:skull_and_roses",
    "minecraft:wither",
    "minecraft:fighters",
    "minecraft:pointer",
    "minecraft:pigscene",
    "minecraft:burning_skull",
    "minecraft:skeleton",
    "minecraft:donkey_kong",
    "minecraft:baroque",
    "minecraft:humble",
    "minecraft:meditative",
    "minecraft:prairie_ride",
    "minecraft:unpacked",
    "minecraft:backyard",
    "minecraft:bouquet",
    "minecraft:cavebird",
    "minecraft:changing",
    "minecraft:cotan",
    "minecraft:endboss",
    "minecraft:fern",
    "minecraft:finding",
    "minecraft:lowmist",
    "minecraft:orb",
    "minecraft:owlemons",
    "minecraft:passage",
    "minecraft:pond",
    "minecraft:sunflowers",
    "minecraft:tides"
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

    writeJSON(`./data/escapecraft/recipe/stonecutter/painting/${filename}.json`, data );

})

// Object.entries(storage_advancment_map).forEach( ([key, recipes]) => {

//     const advancement = recipeAdvancement(key, recipes);
//     writeJSON(`./data/escapecraft/advancement/recipes/stonecutter/painting/${key}.json`, advancement );
// })