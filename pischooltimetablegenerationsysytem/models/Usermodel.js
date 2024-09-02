const db = require("../db"); 

// FUNCTION TO CREATE USER
const createUser = (userData, callback) => {
    const query = "INSERT INTO user (FullName, Date_of_birth, Password, Email, Phonenumber, ProfilePicture, role_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(query, [userData.FullName, userData.Date_of_birth, userData.Password, userData.Email, userData.Phonenumber, userData.ProfilePicture, userData.role_id], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// FUNCTION TO GET ALL USERS
const getUsers = (callback) => {
    const query = "SELECT * FROM user";
    db.query(query, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// FUNCTION TO GET USER BY ID
const getUserByID = (user_id, callback) => {
    const query = "SELECT * FROM user WHERE user_id = ?";
    db.query(query, [user_id], (err, result) => {
        if (err) {
            return callback(err);
        }
        if (result.length === 0) {
            return callback(new Error(`User with ID ${user_id} doesn't exist`));
        }
        callback(null, result);
    });
};

// FUNCTION TO UPDATE USER DATA
const updateUser = (user_id, userData, callback) => {
    const query = "UPDATE user SET FullName = ?, Date_of_birth = ?, Password = ?, Email = ?, Phonenumber = ?, ProfilePicture = ?, role_id = ? WHERE user_id = ?";
    
    db.query(query, [userData.FullName, userData.Date_of_birth, userData.Password, userData.Email, userData.Phonenumber, userData.ProfilePicture, userData.role_id, user_id], (err, results) => {
        if (err) {
            return callback(err);
        }
        if (results.affectedRows === 0) {
            return callback(new Error(`No user found with ID ${user_id} to update.`));
        }
        callback(null, results);
    });
};

// FUNCTION TO DELETE USER
const deleteUser = (user_id, callback) => {
    const query = "DELETE FROM user WHERE user_id = ?";
    db.query(query, [user_id], (err, results) => {
        if (err) {
            return callback(new Error("Error deleting user"));
        }
        if (results.affectedRows === 0) {
            return callback(new Error(`No user found with ID ${user_id} to delete.`));
        }
        callback(null, results);
    });
};

module.exports = {
    createUser,
    getUsers,
    getUserByID,
    updateUser,
    deleteUser
};
