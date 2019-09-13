
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', tbl => {
        tbl.increments();
        tbl.string('project_name')
            .notNullable();
        tbl.string('project_desc', 1000);
        tbl.boolean('completed')
            .notNullable()
            .defaultTo(false);
    })
    .createTable('tasks', tbl => {
        tbl.increments();
        tbl.integer('project_id')
            .notNullable();
        tbl.integer('step_number')
            .notNullable();
        tbl.string('task_name', 500)
            .notNullable();
        tbl.string('task_notes', 1000);
        tbl.boolean('completed')
            .notNullable()
            .defaultTo(false);
    })
    .createTable('resources', tbl => {
        tbl.increments()
        tbl.string('resource_name')
            .notNullable()
            .unique();
        tbl.string('resource_desc', 500);
    })
    .createTable('project_tasks', tbl => {
        tbl.integer('project_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.integer('task_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('tasks')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.primary(['project_id', 'task_id'])
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('project_tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('projects')
};
