const db = require('../data/dbConfig');

module.exports = {
    addResource,
    getAllResources,
    addProject,
    getAllProjects,
    addTask,
    getTasksByProject,
    getAllTasks,
    getProjectById
}

// helpers for model functions
function getResourceById(id) {
    return db(`resources`)
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
    return db('projects')
        .select("project_name", "project_desc", "task_name", "task_notes", "step_number", "tasks.completed")
        .join('tasks', 'project_id', 'projects.id')
        .where({"projects.id": id})
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

function getResourcesByProject(id) {
    return db('project_resources')
    .select('resources.id as resource_id','resource_name').join('resources', 'resources.id', 'project_resources.resource_id' )
        .where({project_id: id})
}

function getAllTasks() {
    return db('tasks')
}

function getProjectById(id) {
    const projectQuery = db(`projects`)
        .where({ id })
        .then(item => {
            return item.map(a => {
                if (a.completed === 1) {
                    return {
                        ...a, completed: true}
                } else {
                    return {...a, completed: false}
                }
            })
        })
        
    return Promise.all([projectQuery, getTasksByProject(id), getResourcesByProject(id)])
        .then(([project, tasks, resources]) => {
            // const newResources = resources
            const newTasks = tasks.map(task => {
                    return {
                        step_number: task.step_number,
                        task_name: task.task_name,
                        task_notes: task.task_notes,
                        completed: task.completed
                    }
                })
            project[0].tasks = newTasks
            project[0].resources = resources
            return project[0]
        })
}