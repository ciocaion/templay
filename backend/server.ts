import express from 'express';
import db from './db'; // Import the database connection
import cors from 'cors';
import * as mysql from 'mysql2';


const app = express();

const corsOptions = {
  origin: 'https://templay-frontend.vercel.app/', // Replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable credentials (if needed)
};

app.use(cors(corsOptions));

app.use(express.json());

app.get('/api/test', (_req, res) => {
    res.json({ message: 'Success! Backend is responding.' });
  });

  app.post('/api/templates', (req, res) => {
    console.log('Received template data:', req.body);
    const templateData = req.body;
  
    const sql = `INSERT INTO templates (template_json) VALUES (?)`;
  
    db.query(sql, [JSON.stringify(templateData)], (err: { message: any; }, result: unknown) => {
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
  
  
  app.get('/api/templates/:id', (req, res) => {
    const templateId = req.params.id;
    const sql = 'SELECT * FROM templates WHERE template_id = 2';
  
    db.query(sql, [templateId], (err: { message: any; }, result: string | any[]) => {
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