
export async function readJSON( file: string )
{
    return JSON.parse((new TextDecoder).decode(await Deno.readFile(file)))
}


export async function writeJSON( file: string, data: any )
{
    await Deno.writeFile( file, (new TextEncoder).encode( JSON.stringify(data, null, 2)))
}


export const stonecutter = (result, count) => (ingredient: string) => ({
        "type": "minecraft:stonecutting",
        "ingredient": {
          "item": "minecraft:" + ingredient
        },
        "result": "minecraft:" + result(ingredient),
        "count": count
      })
