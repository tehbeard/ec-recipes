import { readJSON, recipeAdvancement, slabToBlockRecipe, writeJSON } from './utils.ts';


const data = await readJSON("ingest/blocks.json");

Object.keys(data).filter(f => f.endsWith("_slab")).forEach( f => {

    const [ns,block] = f.split(":");
    
    const fullBlockName = "minecraft:" + block.replace("_slab", "");
    
    let bigBlock: string = "_FAIL_";
    for(const trial of [ fullBlockName, fullBlockName + "s", fullBlockName + "_planks", fullBlockName + "_block", "_fail_"])
    {
        if(trial in data)
        {
            bigBlock = trial;
            break;
        }else if(trial == "_fail_") {
            console.log(f, "Full block not found!");
            return;
        }
    }

    writeJSON(
        `data/escapecraft/recipes/shapeless/slab_to_block/${block}_to_${bigBlock.split(":")[1]}.json`,
        slabToBlockRecipe(f, bigBlock)
    );
    
    writeJSON(
        `./data/escapecraft/advancements/recipes/shapeless/slab_to_block/${block}.json`,
        recipeAdvancement(block,[`escapecraft:shapeless/slab_to_block/${block}_to_${bigBlock.split(":")[1]}`])
    );

});