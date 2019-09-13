const express = require('express');
const db = require('./projectModel');
const router = express.Router();

/**
 * POST a resource DONE
 * GET all resources DONE
 * POST a project DONE
 * GET all projects, incl. name, desc, completed DONE
 * POST a task DONE
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

// POST a project
router.post('/', (req, res) => {
    const project = req.body;
    db.addProject(project)
        .then(addedproject => {
            res.status(201).json(addedproject)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "Unable to add project to server."})
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

router.get('/tasks', (req, res) => {
    db.getAllTasks()
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "Unable to get task list from server."})
        })
})

// POST task
router.post('/:id/tasks', (req, res) => {
    const task = req.body;
    db.addTask(task)
        .then(list => {
            res.status(201).json(list)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "Unable to add task to server."})
        })
})

// Get project by ID

router.get('/:id', (req, res) => {
    const {id} = req.params;
    db.getProjectById(id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "Unable to retrieve project from the server."})
        })
})



module.exports = router