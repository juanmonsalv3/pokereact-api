module.exports = {
  getPokemonByName(api, name) {
    return api.get(`/pokemon/${name}`);
  },
};
