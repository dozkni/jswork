
const numberOfFilms;

let start = function() {
    do {
        numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
    } 
    while (numberOfFilms == null || isNaN(numberOfFilms));
}

let rememberMyFilms = function() {
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
}

let detectPersonalLevel = function() {
    if (personalMovieDB.count < 10) {
        console.log('Просмотрено довольно мало фильмов');
    } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
        console.log('Вы классический зритель');
    } else if (personalMovieDB.count >= 30) {
        console.log('Вы киноман');
    } else {
        console.log('Произошла ошибка');
    }
}

let showMyDB = function(hidden) {
    if (!hidden) {console.log(personalMovieDB);}
}

let writeYourGenres = function() {
    for (let i = 1; i <= 3; i++) {
        do {
            genre = prompt(`Ваш любимый жанр под номером ${i}`, '');
        } 
        while (genre == null);
        personalMovieDB.genres.push(genre);
    }
}

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

start();
rememberMyFilms();
detectPersonalLevel();
writeYourGenres();
showMyDB(personalMovieDB.privat);