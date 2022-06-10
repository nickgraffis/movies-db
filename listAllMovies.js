const connection = require('./connection')

// function that lists all the movies in the movie table
async function listAllMovies() { 
  const [ movies ] = await connection.promise().query(`
  SELECT 
    movies.id,
    movies.name,
    (SELECT SUM(reviews.stars) FROM reviews WHERE movies.id = reviews.movie_id) AS stars,
    (SELECT COUNT(*) FROM reviews WHERE movies.id = reviews.movie_id) AS review_count
  FROM movies
  `);
  return movies.map(m => {
    let stars = Math.floor(m.stars / m.review_count)
    if (stars < 1) {
      stars = '⭐'
    } else if (stars < 2) {
      stars = '⭐⭐'
    } else if (stars < 3) {
      stars = '⭐⭐⭐'
    } else if (stars < 4) {
      stars = '⭐⭐⭐⭐'
    } else if (stars < 5) {
      stars = '⭐⭐⭐⭐⭐'
    } else {
      stars = '👎'
    }

    return {
      id: m.id,
      name: m.name,
      stars 
    }
  })
}

module.exports = listAllMovies