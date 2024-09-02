const express = require('express');
const router = express.Router();
const userController = require('../models/Usermodel'); 

// Route to create a new user
router.post('/users', (req, res) => {
    const userData = req.body;
    userController.createUser(userData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User created successfully', user_id: result.insertId });
    });
});

// Route to get all users
router.get('/users', (req, res) => {
    userController.getUsers((err, users) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(users);
    });
});

// Route to get a user by ID
router.get('/users/:id', (req, res) => {
    const user_id = req.params.id;
    userController.getUserByID(user_id, (err, user) => {
        if (err) {
            return res.status(404).json({ error: err.message });
        }
        res.status(200).json(user);
    });
});

// Route to update a user
router.put('/users/:id', (req, res) => {
    const user_id = req.params.id;
    const userData = req.body;
    userController.updateUser(user_id, userData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'User updated successfully' });
    });
});

// Route to delete a user
router.delete('/users/:id', (req, res) => {
    const user_id = req.params.id;
    userController.deleteUser(user_id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    });
});

// Export the router
module.exports = router;
