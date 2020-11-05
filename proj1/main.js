
const numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};
for (let i = 0; i < 2; i++) {
    let name, range;
    do {
        name = prompt('Один из последних просмотренных фильмов?', '');
    } 
    while (name == null || name.length < 1 || name.length > 50);
    do {
        range = prompt('На сколько оцените его?', '');
    } 
    while (range == null);
    personalMovieDB.movies[name] = range;
}

if (personalMovieDB.count < 10) {
    console.log('Просмотрено довольно мало фильмов');
} else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
    console.log('Вы классический зритель');
} else if (personalMovieDB.count >= 30) {
    console.log('Вы киноман');
} else {
    console.log('Произошла ошибка');
}

console.log(personalMovieDB);