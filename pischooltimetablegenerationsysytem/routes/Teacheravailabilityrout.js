const express = require("express");
const router = express.Router();
const teacherAvailabilityController = require("../models/Teacheravailabilitymodel");

// Route to create teacher availability
router.post('/t', (req, res) => {
    const availabilityData = req.body;
    teacherAvailabilityController.createTeacherAvailability(availabilityData, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ message: 'Teacher availability created successfully', result });
    });
});

// Route to get all teacher availabilities
router.get('/t', (req, res) => {
    teacherAvailabilityController.getTeacherAvailabilities((err, availabilities) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(availabilities);
    });
});

// Route to get teacher availability by ID
router.get('/t/:id', (req, res) => {
    const availability_id = req.params.id;
    teacherAvailabilityController.getTeacherAvailabilityByID(availability_id, (err, availability) => {
        if (err) {
            return res.status(404).json({ error: err.message });
        }
        res.status(200).json(availability);
    });
});

// Route to update teacher availability
router.put('/t/:id', (req, res) => {
    const availability_id = req.params.id;
    const availabilityData = req.body;
    teacherAvailabilityController.updateTeacherAvailability(availability_id, availabilityData, (err, result) => {
        if (err) {
            return res.status(404).json({ error: err.message });
        }
        res.status(200).json({ message: 'Teacher availability updated successfully' });
    });
});

// Route to delete teacher availability
router.delete('/t/:id', (req, res) => {
    const availability_id = req.params.id;
    teacherAvailabilityController.deleteTeacherAvailability(availability_id, (err, result) => {
        if (err) {
            return res.status(404).json({ error: err.message });
        }
        res.status(200).json({ message: 'Teacher availability deleted successfully' });
    });
});

module.exports = router;
