const express = require("express");  
const multer = require("multer");  
const path = require("path");  
const router = express.Router();  
const { createSchool, getSchool, updateSchool, deleteSchool } = require("../models/Schoolmodel");  

// Set up multer for file uploads  
const storage = multer.diskStorage({  
    destination: (req, file, cb) => {  
        cb(null, "uploads/"); // Directory where files will be stored  
    },  
    filename: (req, file, cb) => {  
        cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename  
    },  
});  

const upload = multer({ storage: storage });  

// Create a new school  
router.post("/post", (req, res) => {  
    createSchool(req.body, (err, results) => {  
        if (err) {  
            return res.status(500).json({ error: 'Error creating school' });  
        }  
        res.status(201).json({ id: results.insertId });  
    });  
});  

// Get all schools  
router.get("/get", (req, res) => {  
    getSchool((err, results) => {  
        if (err) {  
            return res.status(500).json({ error: 'Error fetching schools' });  
        }  
        res.json(results);  
    });  
});  

// Update a school with logo upload  
router.put("/:id", upload.single('logo'), (req, res) => {  
    const { id } = req.params;  
    const schoolData = {  
        name: req.body.name,  
        POBox: req.body.POBox,  
        email: req.body.email,  
        phonenumber: req.body.phonenumber,  
        logo: req.file ? req.file.path : null // Save the file path if uploaded  
    };  

    updateSchool(id, schoolData, (err, results) => {  
        if (err) {  
            return res.status(500).json({ error: 'Error updating school' });  
        }  
        res.json({ message: 'School updated' });  
    });  
});  

// Delete a school  
router.delete("/:id", (req, res) => {  
    const { id } = req.params;  
    deleteSchool(id, (err, results) => {  
        if (err) {  
            return res.status(500).json({ error: 'Error deleting school' });  
        }  
        res.json({ message: 'School deleted' });  
    });  
});  

module.exports = router; 