
exports.up = function(knex, Promise) {
  return Promise.all([
			knex.schema.createTableIfNotExists('works', function(table){
				table.increments('id').primary();
				table.string('work');
				table.string('type');
			}),
		
			knex.schema.createTableIfNotExists('books', function(table){
				table.increments('id').references('id').inTable('works');;
				table.string('title');
				table.string('author');
				table.json('data');
				table.timestamps('created-at');
			}),
		
			knex.schema.createTableIfNotExists('movies', function(table){
				table.integer('id').references('id').inTable('works');
				table.string('title');
				table.string('director');
				table.json('data');
				table.timestamps('created-at');
			}),
		
			knex.schema.createTableIfNotExists('games', function(table){
				table.increments('id').references('id').inTable('works');
				table.string('title');
				table.string('studio');
				table.json('data');
				table.timestamps('created-at');
			}),
		
			knex.schema.createTableIfNotExists('tags', function(table){
				table.increments('id');
				table.string('tag');
				table.timestamps('created-at');
			}),
		
			knex.schema.createTableIfNotExists('jointags', function(table){
				table.integer('tag').references('id').inTable('tags');
				table.integer('work').references('id').inTable('works')
				table.timestamps('created-at');
			})
		])
};

exports.down = function(knex, Promise) {
  return Promise.all([
		knex.schema.dropTable('works'),
		knex.schema.dropTable('books'),
		knex.schema.dropTable('movies'),
		knex.schema.dropTable('games'),
		knex.schema.dropTable('tags'),
		knex.schema.dropTable('jointags')
	]) 
};
