import { readJSON, recipeAdvancement, walk, writeJSON } from './utils.ts';

const advancement_map = {};

for await ( let path of walk("data/escapecraft/recipes/stonecutter", {includeDirs: false, skip: [/\\wood\\/, /\\tag\\/] })){
    // console.log(path);

    const advPath = path.path.replace("data\\escapecraft\\recipes\\","");

    const data = await readJSON(path.path);

    if( !Array.isArray( advancement_map[data.ingredient.item.split(":")[1]]))
    {
        advancement_map[data.ingredient.item.split(":")[1]] = [];
    }
    advancement_map[data.ingredient.item.split(":")[1]].push( "escapecraft:" + advPath.replace(".json","").replaceAll("\\","/"));
    
    console.log(advPath);
    console.log([, data.result]);
}

Object.entries(advancement_map).forEach( ([key, recipes]) => {

    const advancement = recipeAdvancement(key, recipes);
    writeJSON(`./data/escapecraft/advancements/recipes/stonecutter/${key}.json`, advancement );
})