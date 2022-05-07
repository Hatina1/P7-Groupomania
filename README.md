# Groupomania

# General Information

The project is a social app for a fictive compagny.

# Getting Started

### Prerequisites

1. You will need to have Node and `npm` installed locally on your machine.
2. Clone this repo.

### Backend Installation

Here are the dependancies you need to install (instructions below) :

- NodeJS 12.14 or 14.0.
- Framework Express.js
- Base de données MySQL
- ORM Sequelize

From the "back" folder of the project, run `npm install`. You can then run the server with `node server` or `nodemon server`.
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.

For mySQL database, you have to fill in some information in the file `db-config.js` that will be used in `models/index.js`

- Connect to mySQL
- Create database by executing : `DROP DATABASE IF EXISTS groupomania; CREATE DATABASE groupomania CHARACTER SET 'utf8';`

### Frontend Installation

Here are the dependancies you need to install:

- NodeJS 12.14 or 14.0.
- REACT
- bootstrap
- gif

Then, clone this repo in a folder Groupomania
then cd frontend, run `npm install`, and run `npm install --save-dev run-script-os`. (react, axios, bootstrap)

### `npm start`

In the project directory, run `npm start`. This should both run the local server and launch your browser. If already taken, you can tape `Y`to run on another port.
