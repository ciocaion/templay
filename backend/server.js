"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db")); // Import the database connection
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Enable All CORS Requests for simplicity, or configure as needed
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/test', (_req, res) => {
    res.json({ message: 'Success! Backend is responding.' });
});
app.post('/api/templates', (req, res) => {
    console.log('Received template data:', req.body);
    const templateData = req.body;
    const sql = `INSERT INTO templates (template_json) VALUES (?)`;
    db_1.default.query(sql, [JSON.stringify(templateData)], (err, result) => {
        if (err) {
            console.error('Error saving template:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        // Use type assertion for OkPacket
        const insertResult = result;
        console.log('Template saved:', insertResult);
        res.status(200).json({ message: 'Template saved successfully', templateId: insertResult.insertId });
    });
});
app.get('/api/templates/:id', (req, res) => {
    const templateId = req.params.id;
    const sql = 'SELECT * FROM templates WHERE template_id = 2';
    db_1.default.query(sql, [templateId], (err, result) => {
        if (err) {
            console.error('Error fetching template:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        // Use type guard to check if result is an array of RowDataPacket
        if (Array.isArray(result) && result.length > 0) {
            res.json(result[0]);
        }
        else {
            res.status(404).json({ message: 'Template not found' });
        }
    });
});
app.get('/api', (_req, res) => {
    db_1.default.query('SELECT * FROM templates', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // Type guard to check if results is an array
        if (Array.isArray(results)) {
            if (results.length === 0) {
                res.json({ message: 'No templates found' });
            }
            else {
                res.json(results);
            }
        }
        else {
            res.status(500).json({ error: 'Unexpected result type' });
        }
    });
});