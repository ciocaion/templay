const db = require('../backend/db'); 

module.exports = (req, res) => {
    const templateId = req.query.id;
    const sql = 'SELECT * FROM templates WHERE template_id = ?';

    db.query(sql, [templateId], (err, result) => {
        if (err) {
            console.error('Error fetching template:', err);
            res.status(500).json({ error: err.message });
            return;
        }

        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: 'Template not found' });
        }
    });
};
