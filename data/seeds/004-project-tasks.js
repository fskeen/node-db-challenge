
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, project_id: 3, task_id: 1},
        {id: 2, project_id: 1, task_id: 2},
        {id: 3, project_id: 1, task_id: 3},
        {id: 4, project_id: 2, task_id: 4},
        {id: 5, project_id: 1, task_id: 5},
        {id: 6, project_id: 2, task_id: 6},
      ]);
    });
};
