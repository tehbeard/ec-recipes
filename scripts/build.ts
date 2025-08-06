import './generate-blasting-revert.ts';
import './generate-paintings.ts';
import './generate-stonecutter-wood.ts';
import './generate-unstorage-recipes.ts';
import './slab.ts';
import { writeJSON } from './utils.ts';

// Reset compass recipe to vanilla
// Needed as the wild compass has to turn it into a lodestone compass, this reverts that.
writeJSON(
    './data/escapecraft/recipe/compass_reset.json',
    {"type":"minecraft:crafting_shapeless","ingredients":["minecraft:compass"],"result":{"id":"minecraft:compass"}}
);