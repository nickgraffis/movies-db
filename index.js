const connection = require('./connection')
const inquirer = require('inquirer')
const addReview = require('./addReview')
const addMovie = require('./addMovie')
const listAllMovies = require('./listAllMovies')
const getMovieReviews = require('./getMovieReviews')
const updateReview = require('./updateReview')
const chalk = require('chalk')
const deleteMovie = require('./deleteMovie')
console.log(chalk.cyan('🎉 Welcome to the Movies DB!'));

async function start() {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      choices: [
        '🎥 List all movies',
        '🎥 Add a movie',
        '🎥 Update a movie',
        '🎙 Get movie reviews',
        '🎙 Add a review',
        '🎙 Update a review',
        '😵 Delete a movie',
        '😵 Delete a review',
        '🏃‍♂️ Exit'
      ],
      message: "What would you like to do?"
    }
  ])
  switch(action) {
    case '🎥 List all movies':
      const movies = await listAllMovies()
      console.table(movies)
      return start()
    case '🎥 Add a movie':
      const newMovie = await addMovie()
      console.log(chalk.green(newMovie))
      return start()
    case '🎙 Add a review':
      const review = await addReview()
      console.log(chalk.green(review))
      return start()
    case '🎙 Get movie reviews':
      const reviews = await getMovieReviews()
      console.table(reviews)
      return start()
    case '🎙 Update a review':
      const updatedReview = await updateReview()
      console.log(chalk.green(updatedReview))
      return start()
    case '😵 Delete a movie':
      const deletedMovie = await deleteMovie()
      console.log(chalk.green(deletedMovie))
      return start()
  }
}

start()