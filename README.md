# Groupomania

# General Information

```
The project is a social app for a fictive company Groupomania
```

---

# Getting Started

### Prerequisites

You will need to have Node and `npm` installed locally on your machine.
Clone this repo.

### Backend Installation

Here are among others dependancies you need to install:

- NodeJS
- Framework Express.js
- MySQL
- ORM Sequelize

From the "back" folder of the project, run `npm install`. You can then run the server with `node server` or `nodemon server`.
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.

For mySQL database, you have to fill in some information in the file `db-config.js` that will be used in `models/index.js`

- Connect to mySQL
- Create database by executing : `CREATE DATABASE groupomania;`

### Frontend Installation

Here are the dependancies you need to install:

- NodeJS
- REACT
- bootstrap
- gif

Then, clone this repo in a folder Groupomania
then cd frontend, run `npm install`.

### `npm start`

In the project directory, run `npm start`. This should both run the local server and launch your browser. If port 3000 already taken, you can tape `Y`to run on another port.
