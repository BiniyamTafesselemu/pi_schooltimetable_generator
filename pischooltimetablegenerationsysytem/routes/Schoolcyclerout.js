const express = require("express");
const router = express.Router();
const {  
    getAllSchoolCycles,  
    getSchoolCycleById  
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

module.exports = router;
