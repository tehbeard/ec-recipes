import { recipeAdvancement, stonecutter, writeJSON } from "./utils.ts"; // @ts-ignore


// Need to rework this to be [ input, outputs[] ] tuple so we can mod it for stuff like bamboo mosaic
// using functions to generate the regular set and filtering to limit it.


const storage_types = [
    ['nether_wart_block', 'nether_wart', 9],
    ['glowstone', 'glowstone_dust', 4],
    ['bamboo_block', 'bamboo', 9],
    ['leather','rabbit_hide', 4],
    ['amethyst_block','amethyst_shard', 4]
]


const storage_advancment_map = {};
storage_types.forEach( ([storage, result, qty]) => {
    // console.log( product(wood) );

    const filename = storage + "_to_" + result;

    const data = stonecutter(storage, result, qty);

    writeJSON(`./data/escapecraft/recipes/stonecutter/unstorage/${filename}.json`, data );

    if( !Array.isArray(storage_advancment_map[storage]))
    {
        storage_advancment_map[storage] = [];
    }
    storage_advancment_map[storage].push(`escapecraft:stonecutter/unstorage/${filename}`);

})

Object.entries(storage_advancment_map).forEach( ([key, recipes]) => {

    const advancement = recipeAdvancement(key, recipes);
    writeJSON(`./data/escapecraft/advancement/recipes/stonecutter/unstorage/${key}.json`, advancement );
})