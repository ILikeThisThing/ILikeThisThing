
exports.up = function(knex, Promise) {
  return Promise.all([
			knex.schema.createTableIfNotExists('Works', function(table){
				table.increments('id').primary();
				table.string('title');
				table.string('type');
			}),
		
			knex.schema.createTableIfNotExists('Books', function(table){
				table.increments('id').references('id').inTable('Works').unique();
				table.string('title');
				table.string('author');
				table.string('image');
				table.json('data');
				table.string('image');
				table.timestamps('created-at');
			}),
		
			knex.schema.createTableIfNotExists('Movies', function(table){
				table.integer('id').references('id').inTable('Works').unique();
				table.string('title');
				table.string('director');
				table.string('image');
				table.json('data');
				table.string('image');
				table.timestamps('created-at');
			}),
		
			knex.schema.createTableIfNotExists('Games', function(table){
				table.increments('id').references('id').inTable('Works').unique();
				table.string('title');
				table.string('studio');
				table.string('image');
				table.json('data');
				table.string('image');
				table.timestamps('created-at');
			}),
		
			knex.schema.createTableIfNotExists('Tags', function(table){
				table.increments('id');
				table.string('tag');
				table.timestamps('created-at');
			}),
		
			knex.schema.createTableIfNotExists('WorkTag', function(table){
				table.integer('tag_id').references('id').inTable('Tags');
				table.integer('work_id').references('id').inTable('Works');
				table.integer('count');
				table.timestamps('created-at');
			})
		])
};

exports.down = function(knex, Promise) {
  return Promise.all([
		knex.schema.dropTable('Works'),
		knex.schema.dropTable('Books'),
		knex.schema.dropTable('Movies'),
		knex.schema.dropTable('Games'),
		knex.schema.dropTable('Tags'),
		knex.schema.dropTable('WorkTag')
	]) 
};
