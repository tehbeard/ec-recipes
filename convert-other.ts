
async function readJSON( file: string )
{
    return JSON.parse((new TextDecoder).decode(await Deno.readFile(file)))
}


async function writeJSON( file: string, data: any )
{
    await Deno.writeFile( file, (new TextEncoder).encode( JSON.stringify(data, null, 2)))
}

const validIds = await readJSON("ids.json");

for await (const dirEntry of Deno.readDirSync("otherrecipes") )
{
  
  // CANT DO, STONECUTTER IGNORES TAGS
  if(
    [
      'to_composter',
      'to_workbench',
      'to_sticks'
    ].some( s=> dirEntry.name.includes(s))
    )
  {
    console.log("SKIPPING " + dirEntry.name);
    continue;
  }
  

    const data = await readJSON("otherrecipes/" + dirEntry.name);
    // console.log(data);
    console.log(dirEntry.name);

    if( data['@type'] === 'customcrafting:stonecutter')
    {
      const vanillaEntry = {
        type: "minecraft:stonecutting",
        ingredient: {
          item: `minecraft:${data.source.items[0].item.type.toLowerCase()}`
        },
        result: `minecraft:${data.result.items[0].item.type.toLowerCase()}`,
        count: data.result.items[0].item.amount ?? 1
      }
      await writeJSON("data/escapecraft/recipes/stonecutter/" + dirEntry.name, vanillaEntry);
    }else if( data['@type'] === 'customcrafting:crafting_shapeless'){
    const vanillaEntry = {
        type: "minecraft:crafting_shapeless",
        ingredients: data.ingredients.map( e => e.items.map( item => ({ item: `minecraft:${item.item.type.toLowerCase()}`})))
        ,
        result: {
          item: `minecraft:${data.result.items[0].item.type.toLowerCase()}`,
          count: data.result.items[0].item.amount ?? 1
        }
      }
      await writeJSON("data/escapecraft/recipes/shapeless/" + dirEntry.name, vanillaEntry);
    }else{
      console.error("Invalid type " + data['@type']);
      Deno.exit(-1);
    }

}