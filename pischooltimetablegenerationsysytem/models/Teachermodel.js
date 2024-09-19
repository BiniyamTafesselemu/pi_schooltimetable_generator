const db = require("../db");

// FUNCTION TO CREATE teacher  
const createTeacher = (teacherData, callback) => {  
    const query = "INSERT INTO teacher (email, Full_Name, Date_of_birth, subject_id, availability_id,teacher_image) VALUES (?, ?, ?, ?, ?,?)";  
    db.query(query, [teacherData.email, teacherData.Full_Name, teacherData.Date_of_birth, teacherData.subject_id, teacherData.availability_id], (err, results) => {  
        if (err) {  
            return callback(err);  
        }  
        callback(null, results);  
    });  
};  

// FUNCTION TO GET ALL teachers  
const getTeachers = (callback) => {  
    const query = "SELECT * FROM teacher";  
    db.query(query, (err, results) => {  
        if (err) {  
            return callback(err);  
        }  
        callback(null, results);  
    });  
};

// FUNCTION TO GET teachers BY subject_id  
const getTeachersBySubjectId = (subject_id, callback) => {
    const query = `
        SELECT t.*
        FROM teacher t
        WHERE t.subject_id = ?`;
    db.query(query, [subject_id], (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            return callback(err);
        }
        callback(null, results);
    });
};

// FUNCTION TO GET A teacher BY ID
const getTeacherById = (id, callback) => {
    const query = "SELECT * FROM teacher WHERE teacher_id = ?";
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        if (results.length === 0) {
            return callback(new Error(`Teacher with ID ${id} does not exist.`));
        }
        callback(null, results[0]);
    });
};

// FUNCTION TO CHECK IF teacher EXISTS  
const teacherExists = (id, callback) => {
    const query = "SELECT COUNT(*) AS count FROM teacher WHERE teacher_id = ?";
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0].count > 0);
    });
};

// FUNCTION TO UPDATE teacher DATA  
const updateTeacher = (id, teacherData, callback) => {  
    teacherExists(id, (err, exists) => {
        if (err) {
            return callback(err);
        }
        if (!exists) {
            return callback(new Error(`Teacher with ID ${id} does not exist.`));
        }

        const query = "UPDATE teacher SET email = ?, Full_Name = ?, Date_of_birth = ?,teacher_image = ?, subject_id = ?, availability_id = ? WHERE teacher_id = ?";  
        db.query(query, [teacherData.email, teacherData.Full_Name, teacherData.Date_of_birth, teacherData.teacher_image,teacherData.subject_id, teacherData.availability_id, id], (err, results) => {  
            if (err) {  
                return callback(err);  
            }  
            callback(null, results);  
        });  
    });
};  

// FUNCTION TO DELETE teacher  
const deleteTeacher = (id, callback) => {  
    teacherExists(id, (err, exists) => {
        if (err) {
            return callback(err);
        }
        if (!exists) {
            return callback(new Error(`Teacher with ID ${id} does not exist.`));
        }

        const query = "DELETE FROM teacher WHERE teacher_id = ?";  
        db.query(query, [id], (err, results) => {  
            if (err) {  
                console.error("Error executing delete query:", err); // Log the error
                return callback(new Error("Error deleting teacher"));  
            }  
            if (results.affectedRows === 0) {
                return callback(new Error(`No teacher found with ID ${id} to delete.`));
            }
            callback(null, results);  
        });  
    });
};  

// Export the functions  
module.exports = {  
    createTeacher,
    getTeachersBySubjectId,  
    getTeachers,  
    getTeacherById, 
    updateTeacher,  
    deleteTeacher,  
};  
