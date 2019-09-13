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

// POST a resource
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

// GET all projects
router.get('/', (req, res) => {
    db.getAllProjects()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "Unable to get project list from server."})
        })
})


// GET tasks for a project
router.get('/:id/tasks', (req, res) => {
    const {id} = req.params;
    db.getTasksByProject(id)
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "Unable to get task list from server."})
        })
})
module.exports = router