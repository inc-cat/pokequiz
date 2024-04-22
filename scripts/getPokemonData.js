/*
 * To run this script type
 * ```
 * node ./scripts/getPokemonData.js
 * ```
 */

async function fetchPokemon(generationNumber) {
  //  gather urls from the api for the given generation
  const pokeJson = await fetch(
    `https://pokeapi.co/api/v2/generation/${generationNumber}`
  );
  const data = await pokeJson.json();
  const pokeUrls = data.pokemon_species.map(function (i) {
    return i.url;
  });

  // fetch all species found in generation 1
  const info = pokeUrls.map(function (url) {
    return fetch(url);
  });
  const resolve = await Promise.all(info);
  const species = resolve.map(function (blarg) {
    return blarg.json();
  });
  const resolvedSpecies = await Promise.all(species);

  // get the url for the 1st variety of each species
  newUrls = resolvedSpecies.map(function (entry) {
    return entry.varieties[0].pokemon.url;
  });

  // fetch each variety
  const pokemon = newUrls.map(function (entry) {
    return fetch(entry);
  });
  const resolvedPokemon = await Promise.all(pokemon);
  const pokemonJson = resolvedPokemon.map(function (entry) {
    return entry.json();
  });
  const resolvedPokemonJson = await Promise.all(pokemonJson);

  // extract the data we want from each variety
  const pokemonTypeData = resolvedPokemonJson.map(function (entry) {
    let name = entry.name;
    let id = entry.id;
    let img = entry.sprites.front_default;
    const typeList = entry.types.map(function (type) {
      return type.type.name;
    });
    return { id: id, name: name, type: typeList, img: img };
  });

  // sort by pokemon id
  pokemonTypeData.sort(function (a, b) {
    return a.id - b.id;
  });

  // write to json file
  const json = JSON.stringify(pokemonTypeData);
  const fs = require('fs/promises');
  await fs.writeFile(`./src/data/generation_${generationNumber}`, json, 'utf8');
  console.log('success!');
}

fetchPokemon(process.argv[2]);
