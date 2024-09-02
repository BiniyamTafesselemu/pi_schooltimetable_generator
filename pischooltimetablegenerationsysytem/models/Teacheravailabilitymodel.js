const db = require("../db"); 

// FUNCTION TO CREATE TEACHER AVAILABILITY
const createTeacherAvailability = (availabilityData, callback) => {
    const query = "INSERT INTO teacheravailability (timeslot_id) VALUES (?)";
    db.query(query, [availabilityData.timeslot_id], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// FUNCTION TO GET ALL TEACHER AVAILABILITIES
const getTeacherAvailabilities = (callback) => {
    const query = "SELECT * FROM teacheravailability";
    db.query(query, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// FUNCTION TO GET TEACHER AVAILABILITY BY ID
const getTeacherAvailabilityByID = (availability_id, callback) => {
    const query = "SELECT * FROM teacheravailability WHERE availability_id = ?";
    db.query(query, [availability_id], (err, result) => {
        if (err) {
            return callback(err);
        }
        if (result.length === 0) {
            return callback(new Error(`Availability with ID ${availability_id} doesn't exist`));
        }
        callback(null, result);
    });
};

// FUNCTION TO UPDATE TEACHER AVAILABILITY
const updateTeacherAvailability = (availability_id, availabilityData, callback) => {
    const query = "UPDATE teacheravailability SET timeslot_id = ? WHERE availability_id = ?";
    db.query(query, [availabilityData.timeslot_id, availability_id], (err, results) => {
        if (err) {
            return callback(err);
        }
        if (results.affectedRows === 0) {
            return callback(new Error(`No availability found with ID ${availability_id} to update.`));
        }
        callback(null, results);
    });
};

// FUNCTION TO DELETE TEACHER AVAILABILITY
const deleteTeacherAvailability = (availability_id, callback) => {
    const query = "DELETE FROM teacheravailability WHERE availability_id = ?";
    db.query(query, [availability_id], (err, results) => {
        if (err) {
            return callback(new Error("Error deleting availability"));
        }
        if (results.affectedRows === 0) {
            return callback(new Error(`No availability found with ID ${availability_id} to delete.`));
        }
        callback(null, results);
    });
};

module.exports = {
    createTeacherAvailability,
    getTeacherAvailabilities,
    getTeacherAvailabilityByID,
    updateTeacherAvailability,
    deleteTeacherAvailability
};
