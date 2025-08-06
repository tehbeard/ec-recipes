import { recipeAdvancement, stonecutter, writeJSON } from "./utils.ts";


// Need to rework this to be [ input, outputs[] ] tuple so we can mod it for stuff like bamboo mosaic
// using functions to generate the regular set and filtering to limit it.


const woodProductsFromStoneCutter = (prefix, strippedSuffix, tweak = f => f) => ([

    // Regular log
    [strippedSuffix, `${prefix}_button`, 4],
    [strippedSuffix, `${prefix}_door`, 2],
    [strippedSuffix, `${prefix}_fence`, 3],
    [strippedSuffix, `${prefix}_fence_gate`, 1],
    [strippedSuffix, `${prefix}_planks`, 4],
    [strippedSuffix, `${prefix}_pressure_plate`, 2],
    [strippedSuffix, `${prefix}_sign`, 2],
    [strippedSuffix, `${prefix}_slab`, 8],
    [strippedSuffix, `${prefix}_stairs`, 4],
    [strippedSuffix, `stripped_${strippedSuffix}`,1],
    [strippedSuffix, `${prefix}_trapdoor`, 1],

    // Stripped log
    [`stripped_${strippedSuffix}`, `${prefix}_button`, 4],
    [`stripped_${strippedSuffix}`, `${prefix}_door`, 2],
    [`stripped_${strippedSuffix}`, `${prefix}_fence`, 3],
    [`stripped_${strippedSuffix}`, `${prefix}_fence_gate`, 1],
    [`stripped_${strippedSuffix}`, `${prefix}_planks`, 4],
    [`stripped_${strippedSuffix}`, `${prefix}_pressure_plate`, 2],
    [`stripped_${strippedSuffix}`, `${prefix}_sign`, 2],
    [`stripped_${strippedSuffix}`, `${prefix}_slab`, 8],
    [`stripped_${strippedSuffix}`, `${prefix}_stairs`, 4],
    [`stripped_${strippedSuffix}`, `${prefix}_trapdoor`, 1],

].map(tweak))


const wood_types = [
    ...woodProductsFromStoneCutter('oak','oak_log'),
    ...woodProductsFromStoneCutter('spruce','spruce_log'),
    ...woodProductsFromStoneCutter('birch','birch_log'),
    ...woodProductsFromStoneCutter('jungle','jungle_log'),
    ...woodProductsFromStoneCutter('acacia','acacia_log'),
    ...woodProductsFromStoneCutter('dark_oak','dark_oak_log'),
    
    ...woodProductsFromStoneCutter('mangrove','mangrove_log'),

    ...woodProductsFromStoneCutter('cherry','cherry_log'),

    // Nether
    ...woodProductsFromStoneCutter('crimson','crimson_stem'),
    ...woodProductsFromStoneCutter('warped','warped_stem'),
    ...woodProductsFromStoneCutter('bamboo', 'bamboo_block', f => {
        // Patch quantities to half.
        f[2] = Math.max(Math.floor(f[2] / 2), 1);
        return f;
    }),
]

const tag_based = [
    'composter',
    'crafting_table',
    'sticks'
];


const wood_advancment_map = {};
wood_types.forEach( ([wood, product, qty]) => {
    // console.log( product(wood) );

    const filename = wood + "_to_" + product;

    const data = stonecutter(wood, product, qty);

    writeJSON(`./data/escapecraft/recipes/stonecutter/wood/${filename}.json`, data );

    if( !Array.isArray(wood_advancment_map[wood]))
    {
        wood_advancment_map[wood] = [];
    }
    wood_advancment_map[wood].push(`escapecraft:stonecutter/wood/${filename}`);

})

Object.entries(wood_advancment_map).forEach( ([key, recipes]) => {

    const advancement = recipeAdvancement(key, recipes);
    writeJSON(`./data/escapecraft/advancements/recipes/stonecutter/wood/${key}.json`, advancement );
})