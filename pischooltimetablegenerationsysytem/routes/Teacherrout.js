const express = require('express');
const router = express.Router();
const teacherController = require('../models/Teachermodel');

// Route to create a teacher
router.post('/addteacher', (req, res) => {
    const teacherData = req.body;
    teacherController.createTeacher(teacherData, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(results);
    });
});

// Route to get all teachers
router.get('/getallteachers', (req, res) => {
    const sql = `
    SELECT 
        t.teacher_id AS TeacherID,
        t.Full_Name AS FullName,
        s.subject_name AS Subject,
        sc.section_category_name AS Section_Categrory
    FROM teacher t
    JOIN subject s ON t.subject_id = s.subject_id
    JOIN SectionCategory sc ON s.section_category_id = sc.section_category_id
    ORDER BY t.teacher_id, s.subject_name, sc.section_category_name`;

    teacherController.getTeachers(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Process the results to match the desired structure
        const teachers = [];
        const teacherMap = {};

        results.forEach(row => {
            const teacherID = row.TeacherID;

            if (!teacherMap[teacherID]) {
                teacherMap[teacherID] = {
                    teacherID: row.TeacherID,
                    FullName: row.FullName,
                    Subject: [],
                    Section_Category: []
                };
                teachers.push(teacherMap[teacherID]);
            }

            // Add subjects and grades to each teacher if not already present
            if (!teacherMap[teacherID].Subject.includes(row.Subject)) {
                teacherMap[teacherID].Subject.push(row.Subject);
            }

            if (!teacherMap[teacherID].Section_Category.includes(row.Section_Category)) {
                teacherMap[teacherID].Section_Category.push(row.Section_Category);
            }
        });

        res.status(200).json({ teachers });
    });
});
// Route to get a teacher by ID
router.get('/:id', (req, res) => {
    const teacherId = req.params.id;
    teacherController.getTeacherById(teacherId, (err, result) => {
        if (err) {
            return res.status(404).json({ error: err.message });
        }
        res.status(200).json(result);
    });
});

// Route to update a teacher
router.put('/update/:id', (req, res) => {
    const teacherId = req.params.id;
    const teacherData = req.body;
    teacherController.updateTeacher(teacherId, teacherData, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// Route to delete a teacher
router.delete('/delete/:id', (req, res) => {
    const teacherId = req.params.id;
    teacherController.deleteTeacher(teacherId, (err, results) => {
        if (err) {
            return res.status(404).json({ error: err.message });
        }
        res.status(204).send(); 
    });
});

// Route to get teachers by subject_id
router.get('/subject/:subject_id', (req, res) => {
    const subjectId = req.params.subject_id;
    teacherController.getTeachersBySubjectId(subjectId, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
