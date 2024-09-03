const express = require('express');
const { createPool } = require('mysql');
const cors = require('cors');
const moment = require('moment');

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

app.get('/timeslots', (req, res) => {

  const { periodBeforeBreak, periodBeforeLunch, periodAfterLunch } = req.query; 
  const TotalPeriod = parseInt(periodBeforeLunch) + parseInt(periodBeforeBreak) + parseInt(periodAfterLunch);

  const sql = `
    SELECT 
      ts.timeslot_settings_id AS TimeslotSettingsID,
      ts.School_Day AS SchoolDay,
      ts.periods_per_day AS PeriodsPerDay,
      ts.Class_session_Duration AS ClassSessionDuration,
      ts.Break_session_duration AS BreakSessionDuration,
      ts.Lunch_session_duration AS LunchSessionDuration,
      ts.Break_start_time AS BreakStartTime,
      ts.Lunch_start_time AS LunchStartTime,
      ts.First_period_start_time AS FirstPeriodStartTime
    FROM Timeslot t
    JOIN TimeslotSetting ts ON t.timeslot_settings_id = ts.timeslot_settings_id
  `;

  pool.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }

    results.forEach(row => {
      const ClassSessionDuration = timeToMinutes(row.ClassSessionDuration);
      const BreakSessionDuration = timeToMinutes(row.BreakSessionDuration);
      const LunchSessionDuration = timeToMinutes(row.LunchSessionDuration);
      const BreakStartTime = row.BreakStartTime;
      const LunchStartTime = row.LunchStartTime;
      const FirstPeriodStartTime = row.FirstPeriodStartTime;
      const SchoolDay = row.SchoolDay;
      const PeriodsPerDay = row.PeriodsPerDay;

      if (TotalPeriod <= PeriodsPerDay) {
        let start = moment(FirstPeriodStartTime, 'HH:mm:ss');

        // Class sessions before break
        for (let i = 0; i < periodBeforeBreak; i++) {
          let end = start.clone().add(ClassSessionDuration, 'minutes');
          insertTimeInterval(start.format('HH:mm:ss'), end.format('HH:mm:ss'), 'Class Session', SchoolDay);
          start = end;
        }

        // Break session
        let Break_end = moment(BreakStartTime, 'HH:mm:ss').add(BreakSessionDuration, 'minutes');
        insertTimeInterval(start.format('HH:mm:ss'), Break_end.format('HH:mm:ss'), 'Break Session', SchoolDay);
        start = Break_end;

        // Class sessions before lunch
        for (let i = 0; i < periodBeforeLunch; i++) {
          let end = start.clone().add(ClassSessionDuration, 'minutes');
          insertTimeInterval(start.format('HH:mm:ss'), end.format('HH:mm:ss'), 'Class Session', SchoolDay);
          start = end;
        }

        // Lunch session
        let Lunch_end = moment(LunchStartTime, 'HH:mm:ss').add(LunchSessionDuration, 'minutes');
        insertTimeInterval(start.format('HH:mm:ss'), Lunch_end.format('HH:mm:ss'), 'Lunch Session', SchoolDay);
        start = Lunch_end;

        // Class sessions after lunch
        for (let i = 0; i < periodAfterLunch; i++) {
          let end = start.clone().add(ClassSessionDuration, 'minutes');
          insertTimeInterval(start.format('HH:mm:ss'), end.format('HH:mm:ss'), 'Class Session', SchoolDay);
          start = end;
        }
      }
    });

    res.status(200).json({ message: 'Time intervals inserted successfully' });
  });

  function insertTimeInterval(start, end, type, day) {
    const insertSql = 'INSERT INTO Timeslot (Start, End, Type, Day) VALUES (?, ?, ?, ?)';
    pool.query(insertSql, [start, end, type, day], (err) => {
      if (err) {
        console.error('Error inserting time interval:', err);
      }
    });
  }
});

app.listen(3060, () => {
  console.log('Server is running on port 3060');
});

