const express = require('express');
const morgan = require('morgan');
const heroRoutes = require('./routes/heroRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use('/', heroRoutes);

app.use((req, res) => res.status(404).json({ error: 'Endpoint findes ikke' }));
app.use(errorHandler); // altid til sidst

if (require.main === module) {
    app.listen(3000, () => console.log('SuperHero API: http://localhost:3000'));
}
module.exports = app;