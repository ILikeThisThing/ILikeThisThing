# ILikeThisThing

> This is a thing. And I like it!

## Team

  - __Product Owner__: Natalie
  - __Scrum Master__: Justin
  - __Development Team Members__: Brad, Julia

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 5.5.0
- Postgresql 9.5.x
- Express ^4.13.4

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```
- npm install will run bower install after npm completes

To install Postgresql and start up local db server: 
```sh
brew install postgresql
postgres -D /usr/local/var/postgres
```
See this [blog post](http://www.dancorman.com/knex-your-sql-best-friend/) for more information on setting up postgresql.

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](https://github.com/unexpected-lion/ourglass/blob/master/contributing.md) for contribution guidelines.

## Suggestions for Future Features

- Front end needs a lot of love. (Back end, however, is relatively complete and ready for new features.)
	- You could render D3 graphs (perhaps a word cloud of tagNames) in the individual results page
	- Either more work could be done in raw CSS or transfer more fully into Bootstrap or another front end framework
- Have recommended works only appear once, listing the tags that matched.
	- Current behavior: Works are listed once for every matching tag, resulting in multiple listings of the same work.
- Improve sorting of recommendations:
	- Quick change (v1): Sort results in order of the number of tags they have in common with the user's submission. minimal work required from what already exists, but huge improvements in accuracy.
	- Deeper change (v2): A more complex algorithim to display results to the user -- you could sort by how many times a given work is returned from the database (as in how many tags it matched) -- currently the number of times a given work (say Harry Potter) has been given a certain tag (say Genre-Fantasy) is kept track of and stored in the database.
- Allow searching by tag (action, quirky characters, etc.), not just by work and tags provided.
- Allow searching by work without providing any information about that work - just using information already stored for it in the db.
- Add more media types -- we would have liked to include boardgames and, more abstractly, music (how interesting would it be to be recommended certain albums because you liked a particular book!)
- Add user accounts/auth. Favoriting, automated recommendations based on previous search history, etc.

