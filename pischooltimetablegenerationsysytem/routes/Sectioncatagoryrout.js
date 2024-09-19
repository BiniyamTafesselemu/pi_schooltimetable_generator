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

            // Process categories to build the hierarchical structure
            const sectionCategories = {};

            categories.forEach(row => {
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
                    Subject: row.Subject,
                    Teacher: {
                        name: row.TeacherName,
                        ID: row.TeacherID
                    }
                });
            });

            // Convert object to array
            const result = Object.values(sectionCategories);

            res.json(result);
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

        // Process the category to build the hierarchical structure
        const sectionCategories = {
            SectionCategory: category.SectionCategory,
            Sections: []
        };

        // Assume we have a function to fetch sections and subjects for this category
        getSectionsAndSubjectsByCategoryId(id, (err, sections) => {
            if (err) {
                return res.status(500).json({ error: 'Error fetching sections and subjects' });
            }

            sections.forEach(row => {
                // Find or create the section
                let section = sectionCategories.Sections.find(s => s.SectionName === row.SectionName);
                if (!section) {
                    section = {
                        SectionName: row.SectionName,
                        Subjects: []
                    };
                    sectionCategories.Sections.push(section);
                }

                // Add the subject with teacher details
                section.Subjects.push({
                    Subject: row.Subject,
                    Teacher: {
                        name: row.TeacherName,
                        ID: row.TeacherID
                    }
                });
            });

            res.json(sectionCategories);
        });
    });
});

module.exports = router;
