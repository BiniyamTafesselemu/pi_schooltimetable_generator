const db = require("../db");

// FUNCTION TO CREATE SCHOOL  
const createSchool = (schoolData, callback) => {  
    const query = "INSERT INTO school (name, POBox, email, phonenumber, logo) VALUES (?, ?, ?, ?, ?)";  
    db.query(query, [schoolData.name, schoolData.POBox, schoolData.email, schoolData.phonenumber, schoolData.logo], (err, results) => {  
        if (err) {  
            return callback(err);  
        }  
        callback(null, results);  
    });  
};  

// FUNCTION TO GET ALL SCHOOLS  
const getSchool = (callback) => {  
    const query = "SELECT * FROM school";  
    db.query(query, (err, results) => {  
        if (err) {  
            return callback(err);  
        }  
        callback(null, results);  
    });  
};  

// FUNCTION TO CHECK IF SCHOOL EXISTS  
const schoolExists = (id, callback) => {
    const query = "SELECT COUNT(*) AS count FROM school WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0].count > 0);
    });
};

// FUNCTION TO UPDATE SCHOOL DATA  
const updateSchool = (id, schoolData, callback) => {  
    schoolExists(id, (err, exists) => {
        if (err) {
            return callback(err);
        }
        if (!exists) {
            return callback(new Error(`School with ID ${id} does not exist.`));
        }

        const query = "UPDATE school SET name = ?, POBox = ?, email = ?, phonenumber = ?, logo = ? WHERE id = ?";  
        db.query(query, [schoolData.name, schoolData.POBox, schoolData.email, schoolData.phonenumber, schoolData.logo, id], (err, results) => {  
            if (err) {  
                return callback(err);  
            }  
            callback(null, results);  
        });  
    });
};  

// FUNCTION TO DELETE SCHOOL  
const deleteSchool = (id, callback) => {  
    schoolExists(id, (err, exists) => {
        if (err) {
            return callback(err);
        }
        if (!exists) {
            return callback(new Error(`School with ID ${id} does not exist.`));
        }

        const query = "DELETE FROM school WHERE id = ?";  
        db.query(query, [id], (err, results) => {  
            if (err) {  
                console.error("Error executing delete query:", err); // Log the error
                return callback(new Error("Error deleting school"));  
            }  
            if (results.affectedRows === 0) {
                return callback(new Error(`No school found with ID ${id} to delete.`));
            }
            callback(null, results);  
        });  
    });
};  

// Export the functions  
module.exports = {  
    createSchool,  
    getSchool,  
    updateSchool,  
    deleteSchool,  
};  
