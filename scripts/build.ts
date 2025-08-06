import {
    compress,
    decompress
  } from "https://deno.land/x/zip@v1.2.5/mod.ts";

  await compress([
    'pack.mcmeta',
    'data'
  ],'ec-recipes.zip',{ overwrite: true});