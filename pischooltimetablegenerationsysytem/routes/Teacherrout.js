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
    teacherController.getTeachers((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
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
