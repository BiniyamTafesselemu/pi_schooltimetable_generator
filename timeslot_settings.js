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

// CREATE a Time slot setting
app.post('/timeslot-settings', (req, res) => {
  const {
    School_Day,
    periods_per_day,
    Class_session_Duration,
    Break_session_duration,
    Lunch_session_duration,
    Break_start_time,
    Lunch_start_time,
    First_period_start_time,
    section_category_id
  } = req.body;

  const sql = `INSERT INTO TimeslotSetting (
    School_Day,
    periods_per_day,
    Class_session_Duration,
    Break_session_duration,
    Lunch_session_duration,
    Break_start_time,
    Lunch_start_time,
    First_period_start_time,
    section_category_id
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  pool.query(sql, [
    School_Day,
    periods_per_day,
    Class_session_Duration,
    Break_session_duration,
    Lunch_session_duration,
    Break_start_time,
    Lunch_start_time,
    First_period_start_time,
    section_category_id
  ], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Insertion of time slot setting data failed' });
    }
    res.status(201).json({ message: 'Timeslot setting created successfully', timeslotSettingsId: results.insertId });
  });
});

// UPDATE a Time slot setting
app.put('/timeslot-settings/:id', (req, res) => {
  const id = req.params.id;
  const {
    School_Day,
    periods_per_day,
    Class_session_Duration,
    Break_session_duration,
    Lunch_session_duration,
    Break_start_time,
    Lunch_start_time,
    First_period_start_time,
    section_category_id
  } = req.body;

  const sql = `UPDATE TimeslotSetting SET
    School_Day = ?,
    periods_per_day = ?,
    Class_session_Duration = ?,
    Break_session_duration = ?,
    Lunch_session_duration = ?,
    Break_start_time = ?,
    Lunch_start_time = ?,
    First_period_start_time = ?,
    section_category_id = ?
    WHERE timeslot_setting_id = ?`;

  pool.query(sql, [
    School_Day,
    periods_per_day,
    Class_session_Duration,
    Break_session_duration,
    Lunch_session_duration,
    Break_start_time,
    Lunch_start_time,
    First_period_start_time,
    section_category_id,
    id
  ], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to update time slot setting' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Time slot setting not found' });
    }
    res.json({ message: 'Timeslot setting updated successfully' });
  });
});

// DELETE a Time slot setting
app.delete('/timeslot-settings/:id', (req, res) => {
  const id = req.params.id;

  const sql = 'DELETE FROM TimeslotSetting WHERE timeslot_setting_id = ?';

  pool.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to delete time slot setting' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Time slot setting not found' });
    }
    res.json({ message: 'Timeslot setting deleted successfully' });
  });
});

app.listen(3060, () => {
  console.log('Server is running on port 3060');
});
