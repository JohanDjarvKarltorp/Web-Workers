let dictionary = [];

fetch('http://localhost:8080/spell_checking/words.txt')
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        dictionary = data.split('\n');
        checkWords();
    });

onmessage = function(e) {
    let word = e.data.word;
    sleep();
    let result = dictionary.find(element => element == word);

    postMessage({ result: result != undefined, word: word });
}

const sleep = () => {
    let end = 100000000;
    for (let i = 0; i < end; i++) {}
}