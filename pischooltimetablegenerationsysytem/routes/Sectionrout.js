const express = require("express");
const router = express.Router();
const { createSection, getSectionsByCategoryId, deleteSection } = require("../models/Sectionmodel");

// Create a new section under a specific category using section_category_id
router.post("/:categoryId", (req, res) => {
    const { SectionName } = req.body; 
    const section_category_id = req.params.categoryId; 

    createSection({ SectionName, section_category_id }, (err, results) => {
        if (err) {
            console.error("Error creating section:", err.message);
            return res.status(500).json({ error: 'Error creating section' });
        }
        res.status(201).json({ id: results.insertId });
    });
});

// Get all sections under a specific category using section_category_id
router.get("/:categoryId", (req, res) => {
    const section_category_id = req.params.categoryId; 

    getSectionsByCategoryId(section_category_id, (err, rows) => {
        if (err) {
            console.error("Error fetching sections:", err);
            return res.status(500).json({ error: 'Error fetching sections' });
        }

        // Process rows to build the desired structure
        const sectionCategories = {};

        rows.forEach(row => {
            // Initialize section category if not already present
            if (!sectionCategories[row.SectionCategory]) {
                sectionCategories[row.SectionCategory] = {
                    SectionCategory: row.SectionCategory,
                    Sections: []
                };
            }

            const category = sectionCategories[row.SectionCategory];

            // Find or create the section
            let section = category.Sections.find(s => s.SectionName === row.SectionName);
            if (!section) {
                section = {
                    SectionName: row.SectionName,
                    Subjects: []
                };
                category.Sections.push(section);
            }

            // Add the subject with teacher details
            section.Subjects.push({
                Subject: row.subject_name,
                Teacher: {
                    name: row.Full_Name,
                    ID: row.Teacher_id,
                    img: row.Teacher_image
                }
            });
        });

        // Convert object to array
        const result = Object.values(sectionCategories);

        res.json({ Sections: result });
    });
});

module.exports = router;


// Delete a section by ID
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    deleteSection(id, (err, results) => {
        if (err) {
            // Check if the error message indicates the section does not exist
            if (err.message.includes("does not exist")) {
                return res.status(404).json({ error: err.message });
            }
            return res.status(500).json({ error: 'Error deleting section' });
        }
        res.json({ message: 'Section deleted' });
    });
});


module.exports = router;
