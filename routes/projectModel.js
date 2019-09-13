const db = require('../data/dbConfig');

module.exports = {
    addResource,
    getAllResources,
    addProject,
    getAllProjects,
    addTask,
    getTasksByProject,
    getAllTasks
}

// helpers for model functions
function getResourceById(id) {
    return db(`resources`)
    .where({ id })
}
function getProjectById(id) {
    return db(`projects`)
    .where({ id })
}
function getTaskById(id) {
    return db(`tasks`)
    .where({ id })
}

// function addThing(thing) {
//     return db(`${table}`)
//         .insert(thing)
//         .then(id => {
//             return getById(id[0])
//         })
// }

//-------------------Actual DB calls--------------------//

function addResource(resource) {
    const table = 'resources'
    return db(table)
        .insert(resource)
        .then(id => getResourceById(id[0]))
}

function getAllResources() {
    return db('resources')
}

function addProject(project) {
    const table = 'projects'
    return db(table)
        .insert(project)
        .then(id => getProjectById(id[0]))
}

function getAllProjects() {
    return db('projects')
    .then(list => {
        return list.map(a => {
            if (a.completed === 1) {
                return {
                    ...a, completed: true}
            } else {
                return {...a, completed: false}
            }
        })
    })
}

function addTask(task) {
    const table = 'tasks'
    return db(table)
        .insert(task)
        .then(id => getTaskById(id[0]))
}

function getTasksByProject(id) {
    return db('project_tasks')
        .select("project_name", "project_desc", "task_name", "task_notes", "step_number", "tasks.completed")
        .join('projects', 'projects.id', 'project_tasks.project_id')
        .join('tasks', 'tasks.id', 'task_id')
        .where({"project_tasks.project_id": id})
        .orderBy("step_number", "asc")
        .then(list => {
            return list.map(a => {
                if (a.completed === 1) {
                    return {
                        ...a, completed: true}
                } else {
                    return {...a, completed: false}
                }
            })
        })
}

function getAllTasks() {
    return db('tasks')
}