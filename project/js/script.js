/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

document.querySelector('.promo__adv').remove();
document.querySelector('.promo__content').style.width = '100%';
document.querySelector('.promo__genre').textContent = 'ДРАМА';
document.querySelector('.promo__bg').style.backgroundImage = 'url("./img/bg.jpg")';

const items = document.querySelectorAll('.promo__interactive-item');
for (let i = 0; i < items.length; i++) {
    if (i <= movieDB.movies.length) {
        items[i].textContent = movieDB.movies[i];
    } else {
        items[i].remove();
    }
}