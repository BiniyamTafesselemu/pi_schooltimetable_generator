const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// Middleware Setup
app.use(express.json());
app.use(cors()); // Enables CORS for all routes

// MySQL connection pool setup
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'pischooltimetable', 
  connectionLimit: 10
});

// Create a new subject
app.post('/subjects', (req, res) => {
  const { name, load, sectionCategoryId } = req.body;
  pool.query(
    `INSERT INTO subject (subject_name, subject_load, section_category_id)
     VALUES (?, ?, ?)`,
    [name, load, sectionCategoryId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(201).json({ id: result.insertId });
    }
  );
});

// Get all subjects
app.get('/subjects', (req, res) => {
  pool.query(
    'SELECT * FROM subject',
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(results);
    }
  );
});

// Get a single subject by ID
app.get('/subjects/:id', (req, res) => {
  const { id } = req.params;
  pool.query(
    'SELECT * FROM subject WHERE subject_id = ?',
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: 'Subject not found' });
      }
      res.json(result[0]);
    }
  );
});

// Update a subject by ID
app.put('/subjects/:id', (req, res) => {
  const { id } = req.params;
  const { name, load, sectionCategoryId } = req.body;
  pool.query(
    `UPDATE subject SET subject_name = ?, subject_load = ?, section_category_id = ? WHERE subject_id = ?`,
    [name, load, sectionCategoryId, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Subject not found' });
      }
      res.json({ message: 'Subject updated successfully' });
    }
  );
});

// Delete a subject by ID
app.delete('/subjects/:id', (req, res) => {
  const { id } = req.params;
  pool.query(
    `DELETE FROM subject WHERE subject_id = ?`,
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Subject not found' });
      }
      res.json({ message: 'Subject deleted successfully' });
    }
  );
});

// Additional endpoints

// Get subjects with section and teacher information
app.get('/subjects/full-info', (req, res) => {
  pool.query(`
    SELECT s.subject_id, s.subject_name, s.subject_load, sc.section_category_name, sec.SectionName, 
           t.teacher_id, t.Full_Name AS teacher_name, t.email AS teacher_email
    FROM subject s
    JOIN sectioncategory sc ON s.section_category_id = sc.section_category_id
    JOIN section sec ON sec.section_category_id = sc.section_category_id
    JOIN teacher t ON t.subject_id = s.subject_id
    WHERE s.section_category_id IS NOT NULL
  `, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});

// Get all sections
app.get('/sections', (req, res) => {
  pool.query(
    'SELECT * FROM section',
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(results);
    }
  );
});

// Get all teachers
app.get('/teachers', (req, res) => {
  pool.query(
    'SELECT * FROM teacher',
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(results);
    }
  );
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
