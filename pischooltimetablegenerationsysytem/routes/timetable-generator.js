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

// Global variables to hold data from the database
let schoolDays = [];
let periodsPerDay = 0;
let sections = [];
let sectionCategories = [];
let scheduleData = [];
let teacherSubjects = {}; // Map teacher_id to their associated subjects
let schedule = {};
let teacherSchedule = {};

// Fetch teacher availability from the database
function fetchTeacherAvailability(teacherId, timeslotId) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT is_available FROM TeacherAvailability WHERE teacher_id = ? AND timeslot_id = ?`;
    pool.query(sql, [teacherId, timeslotId], (err, results) => {
      if (err) {
        console.error("Database query failed:", err);
        return reject(err);
      }
      if (results.length > 0 && results[0].is_available) {
        resolve(true); // Teacher is available for this timeslot
      } else {
        resolve(false); // Teacher is not available
      }
    });
  });
}

// Update teacher availability in the database
function updateTeacherAvailability(teacherId, timeslotId, isAvailable) {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE TeacherAvailability SET is_available = ? WHERE teacher_id = ? AND timeslot_id = ?`;
    pool.query(sql, [isAvailable, teacherId, timeslotId], (err, result) => {
      if (err) {
        console.error("Database update failed:", err);
        return reject(err);
      }
      resolve(true); // Update succeeded
    });
  });
}

// Query database for timetable data
function fetchScheduleData() {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT ts.School_Day AS SchoolDay, ts.periods_per_day AS PeriodsPerDay, 
             t.teacher_id, t.teacher_name, 
             s.subject_id, s.subject_name, 
             sc.section_category_id, sc.section_name, 
             tt.timeslot_id, ts.start_time
      FROM Timetable tt
      JOIN Timeslot ts ON tt.timeslot_id = ts.timeslot_id
      JOIN Teacher t ON tt.teacher_id = t.teacher_id
      JOIN Subject s ON tt.subject_id = s.subject_id
      JOIN SectionCategory sc ON tt.section_category_id = sc.section_category_id
    `;

    pool.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      }
      scheduleData = results.map(row => ({
        schoolDay: row.SchoolDay,
        periodsPerDay: row.PeriodsPerDay,
        teacher: row.teacher_id,
        teacherName: row.teacher_name,
        subject: row.subject_id,
        subjectName: row.subject_name,
        sectioncat: row.section_category_id,
        sectionName: row.section_name,
        timeslot: row.timeslot_id,
        startTime: row.start_time
      }));

      // Create teacher-subject mapping
      scheduleData.forEach(row => {
        if (!teacherSubjects[row.teacher]) {
          teacherSubjects[row.teacher] = [];
        }
        teacherSubjects[row.teacher].push(row.subject);
      });

      resolve();
    });
  });
}

// Fetch school days, periods per day, sections, and section categories from the database
function fetchSchoolData() {
  const queries = [
    'SELECT DISTINCT School_Day FROM Timeslot;',
    'SELECT DISTINCT periods_per_day FROM Timeslot;',
    'SELECT section_name FROM SectionCategory;',
    'SELECT DISTINCT section_category_id, section_category_name FROM SectionCategory;'
  ];

  return Promise.all(queries.map(query => new Promise((resolve, reject) => {
    pool.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  })))
  .then(([schoolDayResults, periodsPerDayResults, sectionResults, sectionCategoryResults]) => {
    schoolDays = schoolDayResults.map(row => row.School_Day);
    periodsPerDay = periodsPerDayResults[0].periods_per_day;
    sections = sectionResults.map(row => row.section_name);
    sectionCategories = sectionCategoryResults.map(row => row.section_category_name);
  });
}

// Function to check if the current assignment is valid
function isValid(currentDay, period, section, timeslot, subject, teacher) {
  // 1. Check if the time slot is already filled for this section
  if (schedule[`${section}_${currentDay}_${period}`]) {
    return false; // This time slot is already occupied
  }

  // 2. Ensure the teacher is assigned to their associated subject
  if (!teacherSubjects[teacher].includes(subject)) {
    return false; // The teacher doesn't teach this subject
  }

  // 3. Ensure no two subjects are assigned to the same time slot for this section
  for (let key in schedule) {
    if (schedule[key] &&
        schedule[key].day === currentDay &&
        schedule[key].period === period &&
        schedule[key].sectioncat === section) {
      return false; // Another subject is already assigned for this section in the same timeslot
    }
  }

  // 4. Ensure the section doesn't have the same schedule across different school days
  for (let key in schedule) {
    if (schedule[key] && 
        schedule[key].sectioncat === section &&
        schedule[key].subject === subject &&
        schedule[key].timeslot === timeslot) {
      return false; // Section has the same schedule on different days
    }
  }

  // 5. Ensure the teacher is not assigned to multiple classes at the same time
  if (teacherSchedule[`${teacher}_${currentDay}_${timeslot}`]) {
    return false; // Teacher is already assigned to another section in this time slot
  }

  return true;
}

// Backtracking algorithm for generating the schedule
async function backtrack(dayIndex = 0, periodIndex = 0, sectionIndex = 0) {
  if (dayIndex === schoolDays.length) return true; // All days are scheduled

  const currentDay = schoolDays[dayIndex];
  const currentPeriod = periodIndex;
  const currentSection = sections[sectionIndex];

  for (let data of scheduleData) {
    const isAvailable = await fetchTeacherAvailability(data.teacher, data.timeslot);

    if (isAvailable && isValid(currentDay, currentPeriod, currentSection, data.timeslot, data.subject, data.teacher)) {
      schedule[`${currentSection}_${currentDay}_${currentPeriod}`] = {
        subject: data.subject,
        teacher: data.teacher,
        timeslot: data.timeslot,
        startTime: data.startTime,
        day: currentDay,
        period: currentPeriod,
        sectioncat: currentSection
      };

      teacherSchedule[`${data.teacher}_${currentDay}_${data.timeslot}`] = true;

      // Update teacher availability in the database (mark as unavailable)
      await updateTeacherAvailability(data.teacher, data.timeslot, false);

      // Recurse
      if (sectionIndex + 1 < sections.length) {
        if (await backtrack(dayIndex, periodIndex, sectionIndex + 1)) return true;
      } else if (periodIndex + 1 < periodsPerDay) {
        if (await backtrack(dayIndex, periodIndex + 1, 0)) return true;
      } else if (dayIndex + 1 < schoolDays.length) {
        if (await backtrack(dayIndex + 1, 0, 0)) return true;
      }

      // Backtrack - Undo assignment
      delete schedule[`${currentSection}_${currentDay}_${currentPeriod}`];
      delete teacherSchedule[`${data.teacher}_${currentDay}_${data.timeslot}`];

      // Restore teacher availability
      await updateTeacherAvailability(data.teacher, data.timeslot, true);
    }
  }

  return false; // No valid assignment found
}

// Function to generate the timetable
function generateTimetable(callback) {
  fetchSchoolData()
    .then(() => fetchScheduleData())
    .then(async () => {
      const success = await backtrack();
      if (success) {
        const formattedTimetable = formatTimetableForFrontend();
        callback(null, formattedTimetable); // Send formatted timetable back
      } else {
        callback('No valid timetable could be generated.', null);
      }
    })
    .catch(err => callback('Error generating timetable: ' + err, null));
}

// Format the generated schedule for frontend
function formatTimetableForFrontend() {
  let formattedTimetable = [];

  sectionCategories.forEach(sectionCategory => {
    let categoryTimetable = {
      SectionCategory: sectionCategory,
      Sections: []
    };

    sections.forEach(section => {
      let sectionTimetable = {
        Name: section,
        timetable: {}
      };

      schoolDays.forEach(day => {
        sectionTimetable.timetable[day] = [];

        for (let period = 0; period < periodsPerDay; period++) {
          let key = `${section}_${day}_${period}`;
          if (schedule[key]) {
            sectionTimetable.timetable[day].push({
              timeStampId: schedule[key].timeslot,
              subject: schedule[key].subject,
              startTime: schedule[key].startTime,
              teacherID: schedule[key].teacher
            });
          }
        }
      });

      categoryTimetable.Sections.push(sectionTimetable);
    });

    formattedTimetable.push(categoryTimetable);
  });

  return formattedTimetable;
}

// Endpoint to generate the timetable
app.get('/generate-timetable', (req, res) => {
  generateTimetable((err, timetable) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(timetable);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
