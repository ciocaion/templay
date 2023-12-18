const db = require('../backend/db'); 

module.exports = (_req, res) => {
    db.query('SELECT * FROM templates', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        if (results.length === 0) {
            res.json({ message: 'No templates found' });
        } else {
            res.json(results);
        }
    });
};
