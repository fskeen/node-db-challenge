const db = require('../data/dbConfig');

module.exports = {
    addResource,
    getAllResources,
    addProject,
    getAllProjects,
    addTask,
    getTasksByProject
}

// helpers for model functions
function getResourceById(id) {
    return db(`resources`)
    .where({ id })
}

// function addThing(thing) {
//     return db(`${table}`)
//         .insert(thing)
//         .then(id => {
//             return getById(id[0])
//         })
// }

function addResource(resource) {
    const table = 'resources'
    return db(table)
        .insert(resource)
        .then(id => getResourceById(id[0]))
}

function getAllResources() {
    return db('resources')
}

function addProject() {

}

function getAllProjects() {

}

function addTask() {

}

function getTasksByProject(id) {

}