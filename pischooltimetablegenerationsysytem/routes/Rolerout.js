const express = require('express');
const router = express.Router();
const roleController = require('../models/Rolemodel'); 

// Route to create a new role
router.post('/roles', (req, res) => {
    const roleData = req.body;
    roleController.createrole(roleData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Role created successfully', role_id: result.insertId });
    });
});

// Route to get all roles
router.get('/getroles', (req, res) => {
    roleController.getrole((err, roles) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(roles);
    });
});

// Route to get a role by ID
router.get('/roles/:id', (req, res) => {
    const role_id = req.params.id;
    roleController.getrolebyID(role_id, (err, role) => {
        if (err) {
            return res.status(404).json({ error: err.message });
        }
        res.status(200).json(role);
    });
});

// Route to update a role
router.put('/roles/:id', (req, res) => {
    const role_id = req.params.id;
    const roleData = req.body;
    roleController.updaterole(role_id, roleData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Role updated successfully' });
    });
});

// Route to delete a role
router.delete('/roles/:id', (req, res) => {
    const role_id = req.params.id;
    roleController.deleterole(role_id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Role deleted successfully' });
    });
});

// Export the router
module.exports = router;
