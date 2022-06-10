const connection = require('./connection')

// function that lists all the movies in the movie table
function listAllMovies() { 
  return connection.promise().query(`SELECT * FROM movies`);
}

module.exports = listAllMovies