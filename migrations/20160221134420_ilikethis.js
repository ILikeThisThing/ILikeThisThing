

exports.up = function(knex, Promise) {
  return Promise.all([
			knex.schema.createTableIfNotExists('Works', function(table){
				table.increments('id').primary();
				table.string('title');
				table.string('type');
			}),
		
			knex.schema.createTableIfNotExists('Books', function(table){
				table.integer('id')//.references('id').inTable('Works').unique();
				table.string('title');
				table.string('author');
				table.string('image');
				table.json('data');
				table.boolean('database');
			}),
		
			knex.schema.createTableIfNotExists('Movies', function(table){
				table.integer('id')//.references('id').inTable('Works').unique();
				table.string('title');
				table.string('director');
				table.string('image');
				table.json('data');
				table.boolean('database');
			}),
		
			knex.schema.createTableIfNotExists('Games', function(table){
				table.integer('id')//.references('id').inTable('Works').unique();
				table.string('title');
				table.string('image');
				table.json('data');
				table.boolean('database');
			}),
		
			knex.schema.createTableIfNotExists('Tags', function(table){
				table.increments('id').primary();
				table.string('tag')//.unique();
			}),
		
			knex.schema.createTableIfNotExists('WorkTag', function(table){
				table.integer('tag_id')//.references('id').inTable('Tags');
				table.integer('work_id')//.references('id').inTable('Works');
				table.integer('count');
				table.unique(['tag_id', 'work_id']);
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
