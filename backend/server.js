"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db"); // Import the getConnection function
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Enable All CORS Requests for simplicity, or configure as needed
app.use((0, cors_1.default)());
const port = process.env.PORT || 4000;
app.use(express_1.default.json());
// Test delay route to check connection pool behavior
// app.get('/api/test-delay', async (_req, res) => {
//   setTimeout(async () => {
//     try {
//       const conn = await getConnection();
//       const [results] = await conn.query('SELECT 1');
//       conn.release();
//       res.json({ message: 'Connection successful after delay', results });
//     } catch (error) {
//       console.error('Database error:', error);
//       res.status(500).json({ error: 'Error executing query' });
//     }
//   }, 15 * 60 * 1000); // Delay for 15 minutes
// });
app.post('/api/templates', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { items, title } = req.body;
        console.log(`Checking for existing template with title: '${title}'`);
        if (typeof title !== 'string') {
            console.error('Invalid title format:', title);
            res.status(400).json({ message: 'Invalid title format.' });
            return;
        }
        const checkSql = 'SELECT * FROM templates WHERE title = ?';
        const conn = yield (0, db_1.getConnection)();
        const [checkResult] = yield conn.query(checkSql, [title]);
        if (Array.isArray(checkResult) && checkResult.length > 0) {
            console.log('Template with this title already exists:', title);
            conn.release();
            res.status(409).json({ message: 'A template with this title already exists.' });
            return;
        }
        const insertSql = `INSERT INTO templates (template_json, title) VALUES (?, ?)`;
        yield conn.query(insertSql, [JSON.stringify(items), title]);
        conn.release();
        res.status(200).json({ message: 'Template saved successfully' });
    }
    catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
        console.error('Database error:', errorMessage);
        res.status(500).json({ error: errorMessage });
    }
}));
app.get('/api/templates/:title', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.params;
        const sql = 'SELECT * FROM templates WHERE title = ?';
        const conn = yield (0, db_1.getConnection)();
        const [result] = yield conn.query(sql, [title]);
        conn.release();
        if (Array.isArray(result) && result.length > 0) {
            res.json(result[0]);
        }
        else {
            res.status(404).json({ message: 'Template not found' });
        }
    }
    catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
        console.error('Database error:', errorMessage);
        res.status(500).json({ error: errorMessage });
    }
}));
app.get('/api', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield (0, db_1.getConnection)();
        const [results] = yield conn.query('SELECT * FROM templates');
        conn.release();
        if (Array.isArray(results)) {
            res.json(results.length === 0 ? { message: 'No templates found' } : results);
        }
        else {
            res.status(500).json({ error: 'Unexpected result type' });
        }
    }
    catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
        console.error('Database error:', errorMessage);
        res.status(500).json({ error: errorMessage });
    }
}));
app.delete('/api/templates/:title', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.params;
        const sql = 'DELETE FROM templates WHERE title = ?';
        const conn = yield (0, db_1.getConnection)();
        yield conn.query(sql, [title]);
        conn.release();
        res.status(200).json({ message: 'Template deleted successfully' });
    }
    catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
        console.error('Database error:', errorMessage);
        res.status(500).json({ error: errorMessage });
    }
}));
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
