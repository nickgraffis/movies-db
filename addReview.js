const connection = require('./connection')
const listAllMovies = require('./listAllMovies')
const inquirer = require('inquirer')

// function that add a review -- this requires a movie_id
async function addReview() {
  const listOfMovies = await listAllMovies()
  const { movie: movieId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'movie',
      choices: listOfMovies.map(m => ({ value: m.id, name: m.name }))
    }
  ])
  const { review, rating } = await inquirer.prompt([
    {
      type: 'input',
      name: 'review',
      message: `What did you think of ${listOfMovies.find(m => m.id === movieId).name}?`
    },
    {
      type: 'list',
      name: 'rating',
      message: 'What was the rating?',
      choices: [
        { name: '1 star', value: 1 },
        { name: '2 stars', value: 2 },
        { name: '3 stars', value: 3 },
        { name: '4 stars', value: 4 },
        { name: '5 stars', value: 5 }
      ]
    }
  ])

  await connection.promise().query(`
    INSERT INTO reviews (review, movie_id, stars)
    VALUES("${review}", ${movieId}, ${rating});
  `)

  return `You added a review of ${listOfMovies.find(m => m.id === movieId).name}!`
}

module.exports = addReview