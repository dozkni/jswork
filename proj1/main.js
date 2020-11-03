const numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};
for (let i = 0; i < 2; i++) {
    const name = prompt('Один из последних просмотренных фильмов?', ''),
        range = prompt('На сколько оцените его?', '');
    personalMovieDB.movies[name] = range;
}

console.log(personalMovieDB);