const router = require('express').Router();
const pick = require('lodash/pick');
const Pokedex = require('../pokedex');

const pokedex = new Pokedex();

router.get('', async function (req, res) {
  const response = await pokedex.getPokedexByName('kanto');

  res.json(response);
});

// pokemon/region/:regionName
router.get('/region/:regionName', async function (req, res) {
  const response = await pokedex.getPokedexByName(req.params.regionName);
  const promises = response.pokemon_entries.map((p) =>
    pokedex.getPokemonByName(p.pokemon_species.name)
  );
  const pokemons = await Promise.all(promises);

  const formattedPokemons = pokemons.map((p) => {
    const formatted = pick(p, ['id', 'name', 'order', 'sprites', 'types']);

    return {
      ...formatted,
      sprites: pick(p.sprites, ['front_default', 'back_default']),
    };
  });

  return res.json(formattedPokemons);
});

// pokemon/:name
router.get('/:name', async function (req, res) {
  const pokemon = await pokedex.getPokemonByName(req.params.name);
  res.json(pokemon.data);
});

module.exports = router;
