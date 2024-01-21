import express from "express";
import { getConnection } from "./db"; // Import the getConnection function
import cors from "cors";

const app = express();

// Enable All CORS Requests for simplicity, or configure as needed
app.use(cors());

const port = process.env.PORT || 4000;
app.use(express.json());

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

app.post("/api/templates", async (req, res) => {
  try {
    const { items, title, seo, alt } = req.body;
    console.log(`Checking for existing template with title: '${title}'`);

    if (typeof title !== "string") {
      console.error("Invalid title format:", title);
      res.status(400).json({ message: "Invalid title format." });
      return;
    }

    const checkSql = "SELECT * FROM templates WHERE title = ?";
    const conn = await getConnection();

    const [checkResult] = await conn.query(checkSql, [title]);

    if (Array.isArray(checkResult) && checkResult.length > 0) {
      console.log("Template with this title already exists:", title);
      conn.release();
      res
        .status(409)
        .json({ message: "A template with this title already exists." });
      return;
    }
    const seoValue = seo || "";
    const altValue = JSON.stringify(alt || {});

    const insertSql = `INSERT INTO templates (template_json, title, seo, alt) VALUES (?, ?, ?, ?)`;
    await conn.query(insertSql, [
      JSON.stringify(items),
      title,
      seoValue,
      altValue,
    ]);
    conn.release();

    res.status(200).json({ message: "Template saved successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Database error:", errorMessage);
    res.status(500).json({ error: errorMessage });
  }
});

app.get("/api/templates/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const sql = "SELECT * FROM templates WHERE title = ?";
    const conn = await getConnection();

    const [result] = await conn.query(sql, [title]);
    conn.release();

    if (Array.isArray(result) && result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: "Template not found" });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Database error:", errorMessage);
    res.status(500).json({ error: errorMessage });
  }
});

app.get("/api", async (_req, res) => {
  try {
    const conn = await getConnection();
    const [results] = await conn.query("SELECT * FROM templates");
    conn.release();

    if (Array.isArray(results)) {
      res.json(
        results.length === 0 ? { message: "No templates found" } : results
      );
    } else {
      res.status(500).json({ error: "Unexpected result type" });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Database error:", errorMessage);
    res.status(500).json({ error: errorMessage });
  }
});

app.delete("/api/templates/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const sql = "DELETE FROM templates WHERE title = ?";
    const conn = await getConnection();

    await conn.query(sql, [title]);
    conn.release();

    res.status(200).json({ message: "Template deleted successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Database error:", errorMessage);
    res.status(500).json({ error: errorMessage });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
