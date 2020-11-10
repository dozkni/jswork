/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    function refreshMoviesList() {
        const list = document.querySelector('.promo__interactive-list');
        list.innerHTML = '';
        movieDB.movies.sort();
        movieDB.movies.forEach((item, i) => {
            if (item.length > 21) {
                item = item.slice(0, 21) + '...';
            }
            list.innerHTML += `<li class="promo__interactive-item">${i + 1} ${item}
                            <div class="delete"></div>
                        </li>`;
        });

        const items = document.querySelectorAll('.delete');
        items.forEach((item, i) => {
            item.addEventListener("click", () => {
                movieDB.movies.splice(i, 1);
                refreshMoviesList();
            });
        });
    }

    document.querySelector('.promo__adv').remove();
    document.querySelector('.promo__content').style.width = '100%';
    document.querySelector('.promo__genre').textContent = 'ДРАМА';
    document.querySelector('.promo__bg').style.backgroundImage = 'url("./img/bg.jpg")';

    refreshMoviesList();

    const form = document.querySelector('form.add'),
        btn = form.querySelector('button'),
        inputName = form.querySelector('.adding__input'),
        checkName = form.querySelector('input[type="checkbox"]');

    form.addEventListener("submit", (event) => {
        let valueName = inputName.value;
        if (!valueName) {
            return;
        }
        if (checkName.checked) {
            console.log('Добавляем любимый фильм');
        }
        movieDB.movies.push(valueName);
        refreshMoviesList();
        event.target.reset();
    });

});