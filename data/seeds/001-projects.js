
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {id: 1, project_name: 'Finish sprint', project_desc: 'Correctly code server and endpoints', completed: false},
        {id: 2, project_name: 'Review React', project_desc: 'Write a CRA from scratch', completed: false},
        {id: 3, project_name: 'Tend Garden', project_desc: 'Make plants not die', completed: false}
      ]);
    });
};
