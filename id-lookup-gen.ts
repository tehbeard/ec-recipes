
const data = JSON.parse( (new TextDecoder).decode(await Deno.readFile("tabs.json")) );

const ids = {};

Object.values(data).forEach( e => {
  e.entries.forEach( id => ids[id] = true )
});

Deno.writeFile("ids.json", (new TextEncoder).encode( JSON.stringify(Object.keys(ids),null,2)) )