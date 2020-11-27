'use strict';

const act = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('first');
        reject(new Error('error CATCH'));
        //resolve('second');
    }, 2000);
});
act.then(second => {
        setTimeout(() => {
            console.log(second);
        }, 2000);
    })
    .catch((error) => console.log(error.message));

fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({name: 'Alex', title:'first post'}),
    headers: {
        'Content-type': 'application/json'
    }
})
    .then(response => response.json())
    .then(json => console.log(json));
