
async function readJSON( file: string )
{
    return JSON.parse((new TextDecoder).decode(await Deno.readFile(file)))
}


async function writeJSON( file: string, data: any )
{
    await Deno.writeFile( file, (new TextEncoder).encode( JSON.stringify(data, null, 2)))
}

const validIds = await readJSON("ids.json");

for await (const dirEntry of Deno.readDirSync("sawmill/recipes") )
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
  

    const data = await readJSON("sawmill/recipes/" + dirEntry.name);
    // console.log(data);

    const vanillaEntry = {
        type: "minecraft:stonecutting",
        ingredient: {
          item: `minecraft:${data.source.items[0].item.type.toLowerCase()}`
        },
        result: `minecraft:${data.result.items[0].item.type.toLowerCase()}`,
        count: data.result.items[0].item.amount ?? 1
      }
    
      if( !validIds.includes(vanillaEntry.ingredient.item))
      {
        console.error(vanillaEntry.ingredient.item + " is not a valid id")
      }else if( !validIds.includes(vanillaEntry.result))
      {
        console.error(vanillaEntry.result + " is not a valid id")
      }else{
        // console.log(dirEntry.name + " correctly converted");
        await writeJSON("data/escapecraft/recipes/stonecutter/" + dirEntry.name, vanillaEntry);
      }

}