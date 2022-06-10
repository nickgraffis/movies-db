const inquirer = require('inquirer')
const connection = require('./connection')
const listAllMovies = require('./listAllMovies')
const chalk = require('chalk')

async function deleteMovie() {
  let listOfMovies = await listAllMovies()
  const { movie } = await inquirer.prompt([
    {
      type: 'list',
      name: 'movie',
      message: 'Which movie would you like to delete?',
      choices: listOfMovies.map(m => ({ value: m.id, name: m.name }))
    }
  ])
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `Are you sure you want to delete ${listOfMovies.find(m => m.id === movie).name}?`
    }
  ])

  if (confirm) {
    await connection.promise().query(`
      DELETE FROM movies
      WHERE id = ${movie}
    `)

    return `You deleted ${listOfMovies.find(m => m.id === movie).name}!`
  } else {
    console.log(chalk.red('You did not delete the movie.'))
  }
}

module.exports = deleteMovie