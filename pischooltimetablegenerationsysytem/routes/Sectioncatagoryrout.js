const express = require("express");
const router = express.Router();
const { 
    getSectionCategoriesByCycleId, 
    getSectionCategoryById, 
    validateSchoolCycle 
} = require("../models/Sectioncatagorymodel");

// Get section categories by school cycle ID
router.get("/categories/:id", (req, res) => {
    const { id } = req.params; // Get the ID from the URL

    // Validate if the school cycle exists
    validateSchoolCycle(id, (err, exists) => {
        if (err) {
            return res.status(500).json({ error: 'Error validating school cycle' });
        }
        
        if (!exists) {
            return res.status(404).json({ message: 'School cycle not found' });
        }

        // If the school cycle exists, fetch the section categories
        getSectionCategoriesByCycleId(id, (err, categories) => {
            if (err) {
                return res.status(500).json({ error: 'Error fetching section categories' });
            }
            res.json(categories); // categories is already in array form
        });
    });
});

// Get a specific section category by ID
router.get("/category/:id", (req, res) => {
    const { id } = req.params; // Get the ID from the URL

    getSectionCategoryById(id, (err, category) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching section category' });
        }
        if (!category) {
            return res.status(404).json({ message: 'Section category not found' });
        }
        res.json(category); // Returning a single object
    });
});

module.exports = router;
