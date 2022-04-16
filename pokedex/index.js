const { default: axios } = require('axios');
const pokemonPokedex = require('./pokemon');

class Pokedex {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://pokeapi.co/api/v2/',
      timeout: 1000,
    });
  }

  getPokemonByName(name) {
    return pokemonPokedex.getPokemonByName(this.api, name);
  }
}

module.exports = Pokedex;
