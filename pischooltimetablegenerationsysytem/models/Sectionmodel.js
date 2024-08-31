const db = require("../db");

// FUNCTION TO CREATE A SECTION
const createSection = (sectionData, callback) => {
    const query = "INSERT INTO section (SectionName, section_category_id) VALUES (?, ?)";
    db.query(query, [sectionData.SectionName, sectionData.section_category_id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

// FUNCTION TO GET ALL SECTIONS BY CATEGORY ID
const getSectionsByCategoryId = (section_category_id, callback) => {
    const query = `
        SELECT s.*
        FROM section s
        WHERE s.section_category_id = ?`;
    db.query(query, [section_category_id], (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            return callback(err);
        }
        callback(null, results);
    });
};

// FUNCTION TO DELETE A SECTION
const deleteSection = (sectionId, callback) => {
    // First, check if the section exists
    const checkQuery = "SELECT * FROM section WHERE section_id = ?";
    
    db.query(checkQuery, [sectionId], (err, results) => {
        if (err) {
            return callback(err);
        }
        
        // If no section is found, return a specific error message
        if (results.length === 0) {
            return callback(new Error(`Section with ID ${sectionId} does not exist.`));
        }

        // If the section exists, proceed to delete it
        const deleteQuery = "DELETE FROM section WHERE section_id = ?";
        db.query(deleteQuery, [sectionId], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    });
};

// Export the functions
module.exports = {
    createSection,
    getSectionsByCategoryId,
    deleteSection,
};
