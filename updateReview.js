const connection = require('./connection')
const listAllMovies = require('./listAllMovies')
const inquirer = require('inquirer')
const getMovieReviews = require('./getMovieReviews')

// function that add a review -- this requires a movie_id
async function updateReview() {
  const [ listOfMovies ] = await listAllMovies()
  const { movie: movieId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'movie',
      choices: listOfMovies.map(m => ({ value: m.id, name: m.name }))
    }
  ])
  const listOfReviews = await getMovieReviews(movieId)

  const { review: reviewId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'review',
      choices: listOfReviews.map(r => ({ value: r.id, name: r.review })),
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
    UPDATE reviews SET review="${review}" WHERE id="${reviewId}"
  `)

  return `You updated a review of ${listOfMovies.find(m => m.id === movieId).name}!`
}

module.exports = updateReview