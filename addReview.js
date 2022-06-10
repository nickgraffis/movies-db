const connection = require('./connection')
const listAllMovies = require('./listAllMovies')
const inquirer = require('inquirer')

// function that add a review -- this requires a movie_id
async function addReview() {
  const [ listOfMovies ] = await listAllMovies()
  const { movie: movieId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'movie',
      choices: listOfMovies.map(m => ({ value: m.id, name: m.name }))
    }
  ])
  const { review } = await inquirer.prompt([
    {
      type: 'input',
      name: 'review',
      message: `What did you think of ${listOfMovies.find(m => m.id === movieId).name}?`
    }
  ])

  await connection.promise().query(`
    INSERT INTO reviews (review, movie_id)
    VALUES("${review}", ${movieId});
  `)

  return `You added a review of ${listOfMovies.find(m => m.id === movieId).name}!`
}

module.exports = addReview