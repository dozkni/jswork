'use strict';

const inputRur = document.querySelector('#RUR'),
    inputUsd = document.querySelector('#USD');

inputRur.addEventListener('input', () => {
    const request = new XMLHttpRequest();

    request.open('GET', 'current.json');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();

    // request.addEventListener('readystatechange', () => {
    //     if (request.readyState === 4 && request.status === 200) {
    //         const data = JSON.parse(request.response);
    //         inputUsd.value = (+inputRur.value / data.current.usd).toFixed(2);
    //     } else {
    //         inputUsd.value = '???';
    //     }
    // });
    request.addEventListener('load', () => {
        if (request.status === 200) {
            const data = JSON.parse(request.response);
            inputUsd.value = (+inputRur.value / data.current.usd).toFixed(2);
        } else {
            inputUsd.value = '???';
        }
    });
});