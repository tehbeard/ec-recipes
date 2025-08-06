import { stonecutter, writeJSON } from "./utils.ts";

const wood_types = [
    ['oak','log'],
    ['spruce','log'],
    ['birch','log'],
    ['jungle','log'],
    ['acacia','log'],
    ['dark_oak','log'],
    
    ['mangrove','log'],

    ['cherry','log'],

    // Nether
    ['crimson','stem'],
    ['warped','stem']
]

const products = [
    [s => `${s[0]}_button`, 4],
    [s => `${s[0]}_door`, 2],
    [s => `${s[0]}_fence`, 3],
    [s => `${s[0]}_gate`, 1],
    [s => `${s[0]}_planks`, 4],
    [s => `${s[0]}_pressure_plate`, 2],
    [s => `${s[0]}_sign`, 2],
    [s => `${s[0]}_slab`, 8],
    [s => `${s[0]}_stairs`, 4],
    [s => `stripped_${s.join("_")}`,1],
    [s => `${s[0]}_trapdoor`, 1],
        // 'red_sand',
        // 'sand',
]

const tag_based = [
    'composter',
    'crafting_table',
    'sticks'
];

wood_types.forEach( wood => {
    products.forEach( ([product, qty]) => {
        // console.log( product(wood) );

        const filename = wood.join("_") + "_to_" + product(wood);

        const data = stonecutter(product, qty)(wood);

        writeJSON(`./data/escapecraft/recipes/stonecutter/wood/${filename}.json`, data );
    })
})