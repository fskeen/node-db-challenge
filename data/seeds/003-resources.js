
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {id: 1, resource_name: "Hose", resource_desc: 'Water noodle'},
        {id: 2, resource_name: "VSCode", resource_desc: 'IDE'},
        {id: 3, resource_name: "Computer", resource_desc: 'Beep boop machine'},
        {id: 4, resource_name: "Time", resource_desc: 'the enemy of us all'},
        {id: 5, resource_name: "Coffee", resource_desc: 'apply generously'},
        {id: 6, resource_name: "Eyeballs", resource_desc: 'dont lose them'}
      ]);
    });
};
