let dictionary = [];
let notWordArray = [];
let correctWordArray = [];
let existedWordObject = {};

fetch('http://localhost:8080/spell_checking/words.txt')
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        dictionary = data.split('\n');
        checkWords();
    });

const checkWords = () => {
    let input = document.getElementById("input");
    let words = [];

    input.addEventListener("input", (e) => {
        let string = input.value;
        let oldLength = words.length;

        words = string.split(' ');
        words.pop();

        if (oldLength < words.length) {
            for (let i = 0; i < words.length; i++) {
                if (!existInDictionary(words[i])) {
                    if (!alreadyExist(words[i], notWordArray)) {
                        addNotWord(words[i]);
                    } else {
                        updateCounters(words[i]);
                    }
                } else if (!alreadyExist(words[i], correctWordArray)) {
                    addCorrectWord(words[i]);
                } else {
                    updateCounters(words[i]);
                }
            }

            resetCounters();

        } else if (oldLength > words.length) {
            console.log("removed word");
        }
    });
}

const existInDictionary = (word) => {
    sleep();
    let result = dictionary.find(element => element == word);
    return result != undefined;
}

const alreadyExist = (word, array) => {
    let found = array.find(element => element == word);

    return found != undefined;
}

const sleep = () => {
    let end = 100000000;
    for (let i = 0; i < end; i++) {}
}

const resetCounters = () => {
    for (let property in existedWordObject) {
        existedWordObject[property] = { counter: 0 };
    }
}

const addNotWord = (words) => {
    let notWord = document.getElementById('notWords');
    let element = document.createElement("p");

    element.innerHTML = words;
    element.id = words;

    notWordArray.push(words);
    notWord.append(element);
}

const addCorrectWord = (word) => {
    let correctWord = document.getElementById('words');
    let element = document.createElement("p");

    element.innerHTML = word;
    element.id = word;

    correctWordArray.push(word);
    correctWord.append(element);
}

const updateCounters = (word) => {
    if (existedWordObject[word] == undefined) {
        existedWordObject[word] = { counter: 1 };
    } else {
        let element = document.getElementById(word);
        existedWordObject[word].counter++;
        if (existedWordObject[word].counter - 1 != 0)
            element.innerHTML = `${word} ${existedWordObject[word].counter - 1}`;
    }
}