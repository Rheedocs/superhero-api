const express = require('express');
const router = express.Router();
const controller = require('../controllers/heroController');
const validateFavorite = require('../validators/favoriteValidator');

router.get('/superheroes', controller.getAll);
router.get('/superheroes/:id', controller.getById);

router.post('/favorites', validateFavorite, controller.addFavorite);
router.get('/favorites', controller.getFavorites);
router.delete('/favorites/:id', controller.removeFavorite);

module.exports = router;