const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start: () => {
        let numberOfFilms;
        do {
            numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
        } 
        while (numberOfFilms == null || isNaN(numberOfFilms));
        this.count = numberOfFilms;
    },
    rememberMyFilms: () => {
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
    },
    detectPersonalLevel: () => {
        if (personalMovieDB.count < 10) {
            console.log('Просмотрено довольно мало фильмов');
        } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
            console.log('Вы классический зритель');
        } else if (personalMovieDB.count >= 30) {
            console.log('Вы киноман');
        } else {
            console.log('Произошла ошибка');
        }
    },
    showMyDB: (hidden) => {
        if (!hidden) {console.log(personalMovieDB);}
    },
    writeYourGenres: () => {
        for (let i = 1; i <= 3; i++) {
            do {
                genre = prompt(`Ваш любимый жанр под номером ${i}`, '');
            } 
            while (genre == null);
            personalMovieDB.genres.push(genre);
        }
    }
};

personalMovieDB.start();
personalMovieDB.rememberMyFilms();
personalMovieDB.detectPersonalLevel();
personalMovieDB.writeYourGenres();
personalMovieDB.showMyDB(personalMovieDB.privat);