const db = require("../db"); 

// Function to get all school cycles  
const getAllSchoolCycles = (callback) => {  
    db.query("SELECT * FROM schoolcycle", (err, results) => {  
        if (err) {  
            return callback(err);  
        }  
        callback(null, results);  
    });  
};  

// Function to get a school cycle by ID  
const getSchoolCycleById = (id, callback) => {  
    db.query("SELECT * FROM schoolcycle WHERE school_cycle_id = ?", [id], (err, results) => {  
        if (err) {  
            console.error("Database error:", err); // Log the error for debugging  
            return callback(err);  
        }  
        callback(null, results[0]);  
    });  
};  

// Function to create a new school cycle  
const createSchoolCycle = (data, callback) => {  
    db.query("INSERT INTO schoolcycle (school_cycle_name) VALUES (?)", [data.school_cycle_name], (err, results) => {  
        if (err) {  
            return callback(err);  
        }  
        callback(null, results.insertId);  
    });  
};  

// Function to update a school cycle  
const updateSchoolCycle = (id, data, callback) => {  
    db.query("UPDATE schoolcycle SET school_cycle_name = ? WHERE school_cycle_id = ?", [data.school_cycle_name, id], (err, results) => {  
        if (err) {  
            return callback(err);  
        }  
        callback(null, results);  
    });  
};  

// Function to delete a school cycle  
const deleteSchoolCycle = (id, callback) => {  
    db.query("DELETE FROM schoolcycle WHERE school_cycle_id = ?", [id], (err, results) => {  
        if (err) {  
            return callback(err);  
        }  
        callback(null, results);  
    });  
};  

module.exports = {  
    getAllSchoolCycles,  
    getSchoolCycleById,  
    createSchoolCycle,  
    updateSchoolCycle,  
    deleteSchoolCycle,  
};