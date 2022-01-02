# Music Library API

## About

The Music library API project as part of the Manchester Codes curriculum (back-end module).

The project is live [here](http://music-library-rs.herokuapp.com/api-docs/)

The project implements RESTful routes and allows users to perform CRUD (Create, Read, Update, Delete) operations on artist and albums in a MySQL database.

The project was built with Node and Express and uses SQL to interact with the database.

Test Driven Development was used throughout the project with Mocha, Chia and Supertest used for itergration testing.

![Screenshot of database schema](https://github.com/greenchul/greenchul/blob/main/assets/music-lib-schema.png)

## Installation

- Pull a MySQL image and run the container
- Clone this repo
- Change in to repo directory
- Run `npm install`
- Create a .env file and add local variables:
  - DB_PASSWORD
  - DB_NAME
  - DB_USER
  - DB_HOST
  - DB_PORT
  - PORT
- If you wan to run the tests create a .env.test file with the same environmental variables changing the DB_NAME variable.
- Run `npm start` to start the project
- Run `npm test` to run the tests

## Routes

### Artists

- Create: POST to /artist
- Read all: GET to /artist
- Read single: GET to /artist/:id
- Update: PATCH to /artist/id
- Delete: DELETE to /artist/:id

### Albums

- Create: POST to /artist/id/album
- Read all: GET to /album
- Read single: GET to /album/:id
- Update: PATCH to /album/:id
- Delete: DELETE to /album/:id
