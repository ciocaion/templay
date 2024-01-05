import express from 'express';
import db from './db'; // Import the database connection
import cors from 'cors';
import * as mysql from 'mysql2';
import { MysqlError } from 'mysql';
import { OkPacket } from 'mysql2';


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
    console.log('Received template data:', req.body);
    const { items, title } = req.body;
  
    // Log the title for debugging
    console.log(`Checking for existing template with title: '${title}'`);
  
    // Ensure that 'title' is a string as expected in the JSON structure
    if (typeof title !== 'string') {
      console.error('Invalid title format:', title);
      res.status(400).json({ message: 'Invalid title format.' });
      return;
    }
  
    // Check if a template with this title already exists in the template_json
    const checkSql = 'SELECT * FROM templates WHERE JSON_UNQUOTE(JSON_EXTRACT(template_json, "$.title")) = ?';
    
    // Log the executed query and parameter
    console.log(`About to execute check query: ${checkSql} with parameter: ${title}`);
  
    db.query(checkSql, [title], (checkErr: mysql.QueryError | null, checkResult: mysql.RowDataPacket[] | mysql.RowDataPacket[][] | OkPacket | OkPacket[], _fields: mysql.FieldPacket[] | mysql.FieldPacket[][]) => {
      console.log('Query callback entered');
  
      if (checkErr) {
        console.error('Error checking for existing template:', checkErr);
        res.status(500).json({ error: checkErr.message });
        return;
      }
  
      console.log('Check result:', checkResult);
      console.log('Before checking if template exists');
  
      if (Array.isArray(checkResult) && checkResult.length > 0) {
        console.log('Template with this title already exists:', title);
        res.status(409).json({ message: 'A template with this title already exists.' });
        return;
      }
  
      // Insert the new template since no template with the same title exists
      const insertSql = `INSERT INTO templates (template_json, title) VALUES (?, ?)`;
  
      // Log the insert query and parameters
      console.log(`Executing insert query: ${insertSql} with parameters:`, JSON.stringify(items), title);
  
      db.query(insertSql, [JSON.stringify(items), title], (insertErr: mysql.QueryError | null, insertResult: OkPacket) => {
        if (insertErr) {
          console.error('Error saving template:', insertErr);
          res.status(500).json({ error: insertErr.message });
          return;
        }
  
        console.log('Template saved successfully:', insertResult);
        res.status(200).json({ message: 'Template saved successfully', templateId: insertResult.insertId });
      });
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