const express = require('express');
const db = require('./projectModel');
const router = express.Router();

/**
 * POST a resource
 * GET all resources
 * POST a project
 * GET all projects, incl. name, desc, completed
 * POST a task
 * GET all tasks for a project, incl. project name, description, and completed
*/

// GET all resources
router.get('/resources', (req, res) => {
    db.getAllResources()
        .then(resources => {
            res.status(200).json(resources)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "Unable to get resource list from server."})
        })
})

router.post('/resources', (req, res) => {
    const resource = req.body;
    db.addResource(resource)
        .then(addedResource => {
            res.status(201).json(addedResource)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "Unable to add resource to server."})
        })
})

module.exports = router