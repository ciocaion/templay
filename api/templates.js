const db = require('../backend/db'); 

module.exports = (req, res) => {
    const templateData = req.body;
    const sql = `INSERT INTO templates (template_json) VALUES (?)`;

    db.query(sql, [JSON.stringify(templateData)], (err, result) => {
        if (err) {
            console.error('Error saving template:', err);
            res.status(500).json({ error: err.message });
            return;
        }

        const insertResult = result.insertId;
        res.status(200).json({ message: 'Template saved successfully', templateId: insertResult });
    });
};
