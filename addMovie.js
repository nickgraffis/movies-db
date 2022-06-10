// function that adds a movie
async function addMovie() {
  const { title } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of this movie?'
    }
  ]);
  await connection.promise().query(`
    INSERT INTO movies (name)
    VALUES ("${title}");
  `)
  return `You created ${title}!`
}

module.exports = addMovie