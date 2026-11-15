module.exports = (err, req, res, next) => {
    console.error(`Fejl: ${req.method} ${req.originalUrl} ${err.message}`);
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'Ugyldig JSON' });
    }
    const status = err.status || 500;
    res.status(status).json({
        error: status === 502
            ? 'Det eksterne API kunne ikke levere data'
            : 'Noget gik galt på serveren'
    });
};