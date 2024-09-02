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
            console.error("Database error:", err);  
            return callback(err);  
        }  
        callback(null, results[0]);  
    });  
};  

// Function to validate if a school cycle exists  
const validateSchoolCycle = (schoolCycleId, callback) => {
    db.query("SELECT * FROM schoolcycle WHERE school_cycle_id = ?", [schoolCycleId], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.length > 0); // true if exists, false otherwise
    });
};

// Export functions for selection only
module.exports = {  
    getAllSchoolCycles,  
    getSchoolCycleById,  
    validateSchoolCycle,  
};  
