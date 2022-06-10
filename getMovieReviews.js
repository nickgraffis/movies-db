const connection = require('./connection')
const listAllMovies = require('./listAllMovies')
const inquirer = require('inquirer')

async function getMovieReviews(movieId) {
  if (!movieId) {
    const [ listOfMovies ] = await listAllMovies()
    let { movie: movie_id } = await inquirer.prompt([
      {
        type: 'list',
        name: 'movie',
        choices: listOfMovies.map(m => ({ value: m.id, name: m.name }))
      }
    ])
    movieId = movie_id
  }

  const [ reviews ] = await connection.promise().query(`
    SELECT * FROM reviews
    WHERE movie_id = ${movieId}
  `)

  return reviews
}

module.exports = getMovieReviews