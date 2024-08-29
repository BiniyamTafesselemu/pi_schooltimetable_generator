const express = require("express");  
const router = express.Router();  
const {  
    getAllSchoolCycles,  
    getSchoolCycleById,  
    createSchoolCycle,  
    updateSchoolCycle,  
    deleteSchoolCycle,  
} = require("../models/Schoolcyclemodel");  

// Get all school cycles  
router.get("/all", (req, res) => {  
    getAllSchoolCycles((err, results) => {  
        if (err) {  
            return res.status(500).json({ error: 'Error fetching school cycles' });  
        }  
        res.json(results);  
    });  
});  

// Get a school cycle by ID  
router.get("/:id", (req, res) => {  
    const { id } = req.params;  
    getSchoolCycleById(id, (err, cycle) => {  
        if (err) {  
            return res.status(500).json({ error: 'Error fetching school cycle' });  
        }  
        if (!cycle) {  
            return res.status(404).json({ message: 'School cycle not found' });  
        }  
        res.json(cycle);  
    });  
});  

// Create a new school cycle  
router.post("/create", (req, res) => {  
    createSchoolCycle(req.body, (err, id) => {  
        if (err) {  
            return res.status(400).json({ error: err.message });  
        }  
        res.status(201).json({ message: 'School cycle created', id });  
    });  
});  

// Update a school cycle  
router.put("/:id", (req, res) => {  
    const { id } = req.params;  
    updateSchoolCycle(id, req.body, (err, results) => {  
        if (err) {  
            return res.status(400).json({ error: err.message });  
        }  
        res.json({ message: 'School cycle updated' });  
    });  
});  

// Delete a school cycle  
router.delete("/:id", (req, res) => {  
    const { id } = req.params;  
    deleteSchoolCycle(id, (err, results) => {  
        if (err) {  
            return res.status(500).json({ error: 'Error deleting school cycle' });  
        }  
        res.json({ message: 'School cycle deleted' });  
    });  
});  

module.exports = router;