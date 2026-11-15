const heroModel = require('../models/heroModel');

exports.getAll = async (req, res, next) => {
    try {
        res.json(await heroModel.fetchAll());
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const hero = await heroModel.fetchById(Number(req.params.id));
        if (!hero) return res.status(404).json({ error: 'Helten findes ikke' });
        res.json(hero);
    } catch (err) {
        next(err);
    }
};

exports.addFavorite = async (req, res, next) => {
    try {
        const { id, note } = req.body;
        const hero = await heroModel.fetchById(id);
        if (!hero) return res.status(404).json({ error: 'Helten findes ikke' });
        if (heroModel.findFavorite(id)) {
            return res.status(409).json({ error: 'Helten er allerede en favorit' });
        }
        res.status(201).json(heroModel.addFavorite(id, note));
    } catch (err) {
        next(err);
    }
};

exports.getFavorites = (req, res) => {
    res.json(heroModel.getFavorites());
};

exports.removeFavorite = (req, res) => {
    const removed = heroModel.removeFavorite(Number(req.params.id));
    if (!removed) return res.status(404).json({ error: 'Favoritten findes ikke' });
    res.status(204).send();
};