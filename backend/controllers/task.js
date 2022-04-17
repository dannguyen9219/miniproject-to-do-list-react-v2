const express = require('express');
const router = express.Router();
const Task = require('../models/Task');


// Index Route //
router.get('/', (req, res) => {
    Task.find({}, (err, foundTasks) => {
        if (!err) {
            res.status(200).json(foundTasks)
        }   else {
            res.status(400).json(err)
        };
    });
});


// Table Route //


// Delete Route //
router.delete('/:id', (req, res) => {
    Task.findByIdAndDelete(req.params.id, (err) => {
        if (!err) {
            res.status(200).json({message: "Deleted the task!"})
        }   else {
            res.status(400).json(err)
        };
    });
});


// Create Route //
router.post('/', (req, res) => {
    const { body } = req;

    Task.create(body, (err, createdTask) => {
        if (!err) {
            res.status(200).json({message: "All good, task created!", createdTask: createdTask})
        }   else {
            res.status(400).json(err)
        }
    });
});


// Show Route //
router.get('/:id', (req, res) => {
    Task.findById(req.params.id, (err, foundTask) => {
        if (!err) {
            res.status(200).json(foundTask)
        }   else {
            res.status(400).json(err)
        };
    });
});




module.exports = router;