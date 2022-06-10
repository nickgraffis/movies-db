const connection = require('./connection')
const inquirer = require('inquirer')
const addReview = require('./addReview')
const addMovie = require('./addMovie')
const listAllMovies = require('./listAllMovies')
const getMovieReviews = require('./getMovieReviews')
const updateReview = require('./updateReview')
const chalk = require('chalk')
console.log(chalk.cyan('🎉 Welcome to the console!'));

async function start() {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      choices: [
        '🎥 List all movies',
        '🎥 Add a movie',
        '🎙 Get movie reviews',
        '🎙 Add a review',
        '🎙 Update a review'
      ],
      message: "What would you like to do?"
    }
  ])
  console.log(action)
  switch(action) {
    case '🎥 List all movies':
      const movies = await listAllMovies()
      console.table(movies[0])
      return start()
    case '🎥 Add a movie':
      const newMovie = await addMovie()
      console.log(newMovie)
      return start()
    case '🎙 Add a review':
      const review = await addReview()
      console.log(review)
      return start()
    case '🎙 Get movie reviews':
      const reviews = await getMovieReviews()
      console.table(reviews)
      return start()
    case '🎙 Update a review':
      const updatedReview = await updateReview()
      console.log(updatedReview)
      return start()
      break;
  }
}

start()