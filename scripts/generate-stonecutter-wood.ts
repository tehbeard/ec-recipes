import { stonecutter } from "./utils.ts";

const wood_types = [
    'oak',
    'spruce',
    'birch',
    'jungle',
    'acacia',
    'darkoak',
    
    'mangrove',

    'cherry',

    // Nether
    'crimsonstem',
    'warpedstem'
]

const suffix = str => s => `${s}_${str}`;

const prefix = str => s => `${str}_${s}`;

const products = [
    stonecutter(suffix('button'), 4),
    stonecutter(suffix('door'), 2),
    stonecutter(suffix('fence'), 3),
    stonecutter(suffix('gate'), 1),
    stonecutter(suffix('plank'), 4),
    stonecutter(suffix('plate'), 2),
    stonecutter(suffix('sign'), 2),
    stonecutter(suffix('slab'), 8),
    stonecutter(suffix('stair'), 4),
    stonecutter(s => `stripped_${s}_log`,1),
    stonecutter(suffix('trapdoor'), 1),
        // 'red_sand',
        // 'sand',
]

const tag_based = [
    'composter',
    'crafting_table',
    'sticks'
];

wood_types.forEach( wood => {
    products.forEach( product => {
        console.log( product(wood) );
    })
})