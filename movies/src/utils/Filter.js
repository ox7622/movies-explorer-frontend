import * as num from '../constants/constants'
export function movieFilter(data, input) {
  return data.filter(movie => (
    // movie.country.toLowerCase() === input ||
    // movie.director.toLowerCase().includes(input) ||
    // movie.nameEN.toLowerCase().includes(input) ||
    movie.nameRU.toLowerCase().includes(input)));

}
export function durationFilter(data) {
  data = data.filter(movie => movie.duration < num.ShortMoviesDuration);
  return data;

}
