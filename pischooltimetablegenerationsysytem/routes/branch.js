const express = require('express');
const { createPool } = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '4nmda@BN',
  database: 'pischooltimetable',
  connectionLimit: 10
});

// CREATE a new branch
app.post('/branch', (req, res) => {
  const { branch_name, email, phonenumber, school_id, school_cycle_id } = req.body;
  const sql = `
    INSERT INTO Branch (branch_name, email, phonenumber, school_id, school_cycle_id)
    VALUES (?, ?, ?, ?, ?)
  `;
  pool.query(sql, [branch_name, email, phonenumber, school_id, school_cycle_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(201).json({ message: 'Branch created successfully', branchId: results.insertId });
  });
});

// READ all branches
app.get('/branch', (req, res) => {
  const sql = `
    SELECT b.branch_name AS BranchName,
           b.email AS Email,
           b.phonenumber AS PhoneNumber,
           sc.school_cycle_name AS SchoolCycleName
    FROM Branch b 
    JOIN SchoolCycle sc ON sc.school_cycle_id = b.school_cycle_id
    ORDER BY b.branch_name, b.phonenumber, b.email, sc.school_cycle_name;
  `;
  pool.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

// DELETE a branch by ID
app.delete('/branch/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Branch WHERE branch_id = ?';
  pool.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Branch not found' });
    }
    res.json({ message: 'Branch deleted successfully' });
  });
});

app.listen(3060, () => {
  console.log('Server is running on port 3060');
});
