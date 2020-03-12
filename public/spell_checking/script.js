let words = [];

fetch('http://localhost:8080/spell_checking/words.txt')
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        words = data.split('\n');
    });