
async function readJSON( file: string )
{
    return JSON.parse((new TextDecoder).decode(await Deno.readFile(file)))
}


async function writeJSON( file: string, data: any )
{
    await Deno.writeFile( file, (new TextEncoder).encode( JSON.stringify(data, null, 2)))
}

const validIds = await readJSON("ids.json");

for await (const dirEntry of Deno.readDir("data/escapecraft/recipes") )
{
  
  for await (const recipeEntry of Deno.readDir("data/escapecraft/recipes/" + dirEntry.name)){
    const data = await readJSON("data/escapecraft/recipes/" + dirEntry.name + "/" + recipeEntry.name);


    console.log(dirEntry.name + "/" + recipeEntry.name);

    const vanillaEntry = {
      "parent": "minecraft:recipes/root",
      "criteria": {
          
      },
      "requirements": [
      ],
      "rewards": {
          "recipes": [
              "escapecraft:" + dirEntry.name + "/" + recipeEntry.name.replace(".json","")
          ]
      }
    }

    if(data.type == 'minecraft:stonecutting')
    {
      const item = data.ingredient.item;
      const tag = data.ingredient.tag;
      vanillaEntry.criteria.has_block = {
        trigger: "minecraft:inventory_changed",
        conditions: ("item" in data.ingredient ) ?
        (
          {
            items: [ ( item? { item } : {tag}) ]
        }
        )
        :
        (
          {
            tag: data.ingredient.tag
          }
        )
      }
      vanillaEntry.requirements.push(['has_block']);
    }else if(data.type == 'minecraft:crafting_shapeless')
    {
      data.ingredients.forEach( ([{item}]) => {
        vanillaEntry.criteria['has_' + item.split(":")[1]] = {
          trigger: "minecraft:inventory_changed",
          conditions: {
              items: [ { item } ]
          }
        };
        vanillaEntry.requirements.push(['has_' + item.split(":")[1]]);
      }
      );
      
      
    }else if(data.type == 'minecraft:crafting_shaped')
    {
      Object.values(data.key).forEach( ({item}) => {
        vanillaEntry.criteria['has_' + item.split(":")[1]] = {
          trigger: "minecraft:inventory_changed",
          conditions: {
              items: [ { item } ]
          }
        };
        vanillaEntry.requirements.push(['has_' + item.split(":")[1]]);
      }
      );
      
      
    }else{
      console.error("Invalid type" + data.type + " from " + recipeEntry.name);
      Deno.exit(-1);
    }
  
    
    await writeJSON("data/escapecraft/advancements/recipes/" + dirEntry.name + "/" + recipeEntry.name, vanillaEntry);
  }

}