const db = require("../db");

// Function to validate if a school cycle exists
const validateSchoolCycle = (schoolCycleId, callback) => {
    db.query("SELECT * FROM schoolcycle WHERE school_cycle_id = ?", [schoolCycleId], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.length > 0); // true if exists, false otherwise
    });
};

// Function to get all section categories by school cycle ID
const getSectionCategoriesByCycleId = (cycleId, callback) => {
    db.query("SELECT * FROM sectioncategory WHERE school_cycle_id = ?", [cycleId], (err, results) => {
        if (err) {
            return callback(err);
        }
        const categoriesArray = results; // Store results in an array form
        callback(null, categoriesArray);
    });
};

// Function to get a section category by ID
const getSectionCategoryById = (id, callback) => {
    db.query("SELECT * FROM sectioncategory WHERE section_category_id  = ?", [id], (err, results) => {
        if (err) {
            console.error("Database query error:", err); // Log the error
            return callback(err);
        }
        if (results.length === 0) {
            console.log(`No section category found with ID: ${id}`); // Log if no results
        }
        const category = results.length > 0 ? results[0] : null; // Return the first result or null if not found
        callback(null, category); // Still returning an object for a single category
    });
};

// Export the functions
module.exports = {
    getSectionCategoriesByCycleId,
    getSectionCategoryById,
    validateSchoolCycle, 
};
