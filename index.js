let fs = require('fs');
let file;
let rows = [];
let values = {};
let result = [];

let setup = (fileName) => {
    file = fs.readFileSync(fileName).toString().split("\n");

    for(i in file) {
        rows.push(file[i].split("\t"));
    }

    for (let i = 1; i < 9; i++) {
        values[rows[i][0]] = [];
    }
};

let pushValues = () => {
    for (let i = 1; i < rows.length; i++) {

        if (i % 9 === 0) {
            i = i + 1;
        }

        let temp = [];

        for (let j = 1; j < 7; j++) {
            temp.push(rows[i][j]);
        }

        values[rows[i][0]].push(temp);
    }
};



let getAverage = () => {
    let temp;
    for (let i = 1; i < 9; i++) {
        temp = values[rows[i][0]];

        let average = 0.0;
        let averageArray = [];

        for (let h = 0; h < 6; h++) {
            average = 0.0;
            for (let j = 0; j < temp.length; j++) {
                average += parseFloat(temp[j][h]);
            }
            average = average / temp.length;

            averageArray.push(Math.round(average));
        }

        result.push(averageArray);
    }
};




let print = () => {
    let strings = [
        "10,000",
        "20,000",
        "40,000",
        "80,000",
        "160,000",
        "320,000",
        "640,000",
        "1,280,000",
    ];

    let workers = [
        0,
        1,
        2,
        4,
        8,
        16
    ];

    let index = 0;

    for (let i = 0; i < result.length; i++) {
        console.log(`${strings[i]}: \n ${result[i].map((e) => `["${workers[index++]}", ${e}]`)}`);
        index = 0;
    }
};


setup('chrome_prime_numbers.txt');
pushValues();
getAverage();
print();
