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

- Node 0.10.x
- Postgresql 9.5.x
- etc
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```
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

- We would have liked to be able to search just by tag aswell -- (This would be a relatively simple database call)
- A more complex algorithim to display results to the user -- you could sort by how many times a given work is returned from the database (as in how many tags it matched) -- currently the number of times a given work (say Harry Potter) has been given a certain tag (say Genre-Fantasy) is kept track of and stored in the database.
- Add more media types -- we would have liked to include boardgames and, more abstractly, music (how interesting would it be to be recommended certain albums because you liked a particular book!)
