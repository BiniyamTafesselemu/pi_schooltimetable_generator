const db = require("../db");

// FUNCTION TO CREATE ROLE
const createrole = (Role, callback) => {
    const query = "INSERT INTO role(role_name) VALUES(?)";
    db.query(query, [Role.role_name], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// FUNCTION TO GET ALL ROLES
const getrole = (callback) => {
    const query = "SELECT * FROM role";
    db.query(query, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// FUNCTION TO GET ROLE BY ID
const getrolebyID = (role_id, callback) => {
    const query = "SELECT * FROM role WHERE role_id = ?";
    db.query(query, [role_id], (err, result) => {
        if (err) {
            return callback(err);
        }
        if (result.length === 0) {
            return callback(new Error(`Role with ID ${role_id} doesn't exist`));
        }
        callback(null, result);
    });
};

// FUNCTION TO CHECK IF ROLE EXISTS
const roleExists = (role_id, callback) => {
    const query = "SELECT COUNT(*) AS count FROM role WHERE role_id = ?";
    db.query(query, [role_id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0].count > 0);
    });
};

// FUNCTION TO UPDATE ROLE DATA
const updaterole = (role_id, roleData, callback) => {
    roleExists(role_id, (err, exists) => {
        if (err) {
            return callback(err);
        }
        if (!exists) {
            return callback(new Error(`Role with ID ${role_id} does not exist.`));
        }

        const query = "UPDATE role SET role_name = ? WHERE role_id = ?";
        db.query(query, [roleData.role_name, role_id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    });
};

// FUNCTION TO DELETE ROLE
const deleterole = (role_id, callback) => {
    roleExists(role_id, (err, exists) => {
        if (err) {
            return callback(err);
        }
        if (!exists) {
            return callback(new Error(`Role with ID ${role_id} does not exist.`));
        }

        const query = "DELETE FROM role WHERE role_id = ?";
        db.query(query, [role_id], (err, results) => {
            if (err) {
                return callback(new Error("Error deleting role"));
            }
            if (results.affectedRows === 0) {
                return callback(new Error(`No role found with ID ${role_id} to delete.`));
            }
            callback(null, results);
        });
    });
};

module.exports = {
    createrole,
    getrole,
    getrolebyID,
    roleExists,
    updaterole,
    deleterole
};
