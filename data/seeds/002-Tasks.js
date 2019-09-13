
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {id: 1, project_id: 3, step_number: 1, task_name: "Water plants", task_notes: "Take hose and water stuff", completed: false},
        {id: 2, project_id: 1, step_number: 1, task_name: "Get boilerplate done", task_notes: "Write SO many templates", completed: false},
        {id: 3, project_id: 1, step_number: 2, task_name: "Plan db design", task_notes: "Tables upon tables", completed: false},
        {id: 4, project_id: 2, step_number: 1, task_name: "Review React", task_notes: "That frontend thing!", completed: false},
        {id: 5, project_id: 1, step_number: 3, task_name: "Write code", task_notes: "NOOOOOOO", completed: false},
        {id: 6, project_id: 2, step_number: 2, task_name: "Review Redux", task_notes: "That other frontend thing!", completed: false}
      ]);
    });
};
