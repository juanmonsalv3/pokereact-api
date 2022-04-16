const router = require('express').Router();
const pokemonRouter = require('./pokemon');

// split up route handling
router.use('/pokemon', pokemonRouter);

module.exports = router
