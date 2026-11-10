const axios = require('axios');

const API_URL = 'https://akabab.github.io/superhero-api/api/all.json';

// Henter alle helte fra det eksterne API og vælger kun de felter, vi bruger
exports.fetchAll = async () => {
    try {
        const response = await axios.get(API_URL, { timeout: 10000 });
        return response.data.map((hero) => ({
            id: hero.id,
            name: hero.name,
            fullName: hero.biography.fullName,
            strength: hero.powerstats.strength,
            image: hero.images.md
        }));
    } catch (err) {
        const error = new Error('Det eksterne API kunne ikke levere data');
        error.status = 502;
        throw error;
    }
};

exports.fetchById = async (id) => {
    const heroes = await exports.fetchAll();
    return heroes.find((hero) => hero.id === id) || null;
};

// Favoritter gemmes i hukommelsen, så de forsvinder, når serveren genstarter
const favorites = [];

exports.getFavorites = () => favorites;

exports.findFavorite = (id) => favorites.find((fav) => fav.id === id) || null;

exports.addFavorite = (id, note) => {
    const favorite = { id, note };
    favorites.push(favorite);
    return favorite;
};

exports.removeFavorite = (id) => {
    const index = favorites.findIndex((fav) => fav.id === id);
    if (index === -1) return false;
    favorites.splice(index, 1);
    return true;
};