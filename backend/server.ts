import express from 'express';
import db from './db'; // Import the database connection
import cors from 'cors';
import * as mysql from 'mysql2';
import { MysqlError } from 'mysql';


const app = express();

// Enable All CORS Requests for simplicity, or configure as needed
app.use(cors());

const port = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Welcome to the API');
});


app.get('/api/test', (_req, res) => {
    res.json({ message: 'Success! Backend is responding.' });
  });

  app.post('/api/templates', (req, res) => {
    console.log('Received data:', req.body);
    const { items, title } = req.body;
  
    const sql = `INSERT INTO templates (template_json, title) VALUES (?, ?)`;
  
    db.query(sql, [JSON.stringify(items), title], (err: MysqlError | null, result: mysql.OkPacket) => {
      if (err) {
        console.error('Error saving template:', err);
        res.status(500).json({ error: err.message });
        return;
      }
  
      // Use type assertion for OkPacket
      const insertResult = result as unknown as mysql.OkPacket;
      console.log('Template saved:', insertResult);
      res.status(200).json({ message: 'Template saved successfully', templateId: insertResult.insertId });
    });
  });
  
  
  app.get('/api/templates/:title', (req, res) => {
    const { title } = req.params;
    const sql = 'SELECT * FROM templates WHERE title = ?';

    db.query(sql, [title], (err: { message: any; }, result: string | any[]) => {
      if (err) {
        console.error('Error fetching template:', err);
        res.status(500).json({ error: err.message });
        return;
      }
  
      // Use type guard to check if result is an array of RowDataPacket
      if (Array.isArray(result) && result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).json({ message: 'Template not found' });
      }
    });
  });

app.get('/api', (_req, res) => {
    db.query('SELECT * FROM templates', (err: { message: any; }, results: string | any[]) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      // Type guard to check if results is an array
      if (Array.isArray(results)) {
        if (results.length === 0) {
          res.json({ message: 'No templates found' });
        } else {
          res.json(results);
        }
      } else {
        res.status(500).json({ error: 'Unexpected result type' });
      }
    });
  });
  

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});