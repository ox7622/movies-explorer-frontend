import * as num from '../constants/constants'
export function movieFilter(data, input) {
  return data.filter(movie => (
    movie.country.toLowerCase() === input ||
    movie.director.toLowerCase().includes(input) ||
    movie.nameEN.toLowerCase().includes(input) ||
    movie.nameRU.toLowerCase().includes(input)));

}
export function durationFilter(data, initialData, checked) {

  console.log(data)
  if (!checked) {
    data = data.filter(movie => movie.duration < num.ShortMoviesDuration);
  }
  else if (checked) {
    data = initialData;
  }

  console.log(data)

  return data;

}

export function ownerFilter(data, user) {
  return data.filter(movie => movie.owner === user._id)
}

export function filterById(savedMovies, movie) {
  return savedMovies.filter(item => item._id !== movie._id)
}