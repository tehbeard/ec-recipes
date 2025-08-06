export async function readJSON(file: string) {
  return JSON.parse(new TextDecoder().decode(await Deno.readFile(file)));
}

export async function writeJSON(file: string, data: any) {
  await Deno.writeFile(
    file,
    new TextEncoder().encode(JSON.stringify(data, null, 2))
  );
}

export const stonecutter = (ingredient, result, count) => ({
  type: "minecraft:stonecutting",
  ingredient: "minecraft:" + ingredient,
  result: { id: "minecraft:" + result, count: count }
});

export const stonecutterTagRecipe = (tag, result, count) => ({
  type: "minecraft:stonecutting",
  ingredient: "#" + tag,
  result: { id: result, count: count }
});

export { walk } from "https://deno.land/std@0.191.0/fs/mod.ts";

export const recipeAdvancement = (item, recipes) => ({
  parent: "minecraft:recipes/root",
  criteria: {
    has_block: {
      trigger: "minecraft:inventory_changed",
      conditions: {
        items: [
          {
            item: "minecraft:" + item,
          },
        ],
      },
    },
  },
  requirements: [["has_block"]],
  rewards: {
    recipes: recipes,
  },
});

export const slabToBlockRecipe = (ingredient, result) => ({
  type: "minecraft:crafting_shapeless",
  ingredients: [
     ingredient,
     ingredient
  ],
  result: {
    id: result,
    count: 1,
  },
});
