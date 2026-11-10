const Joi = require('joi');

// id skal være et helt tal, og note skal være en tekst på mindst 2 tegn
const favoriteSchema = Joi.object({
    id: Joi.number().integer().required(),
    note: Joi.string().min(2).required()
});

// Middleware: stopper requesten med 400, før controlleren kører
module.exports = (req, res, next) => {
    const { error, value } = favoriteSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    req.body = value;
    next();
};