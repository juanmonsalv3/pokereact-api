const router = require('express').Router();
const pick = require('lodash/pick');
const Pokedex = require('../pokedex');

const pokedex = new Pokedex();

router.get('', async function (req, res) {
  const response = await pokedex.getPokedexByName('kanto');

  res.json(response);
});

/**
 * @swagger
 * /pokemon/region/:regionName:
 *  get: 
 *    description: use to get region info with pokemons
 *    responses:
 *      '200':
 *        description: Succesful response
 */
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

/**
 * @swagger
 * /pokemon/:name:
 *  get: 
 *    description: use to get a pokemon info
 *    responses:
 *      '200':
 *        description: Succesful response
 */
router.get('/:name', async function (req, res) {
  const pokemon = await pokedex.getPokemonByName(req.params.name);
  res.json(pokemon.data);
});

module.exports = router;
