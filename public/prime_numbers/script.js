let counter = 0;
let row;
let active = 0;

const isPrime = num => {
    for (let i = 2; i < num; i++)
        if (num % i === 0) return false;
    return num > 1;
}

const print = (name, size) => {
    let duration = performance.getEntriesByName(name)[0].duration;

    row.cells[active].innerHTML = duration + " ms";
    if (active < 6)
        row.cells[++active].innerHTML = '<div class="loader"></div>';

    performance.clearMeasures();
}

const zeroWorkers = (size) => {
    let prime = [];
    performance.mark('start');
    for (let i = 0; i < size; i++) {
        if (isPrime(i)) {
            prime.push(i);
        }
    }
    performance.measure(`0`, 'start');
    print('0', size);
}

const webWorkers = (nrOfWorkers, size) => {
    let running = 0;
    let chunk = size / nrOfWorkers;

    performance.mark('start');

    for (let i = 0; i < nrOfWorkers; i++) {
        workers = new Worker("worker.js");
        workers.onmessage = workerDone;
        workers.postMessage({ start: chunk * i, end: chunk * (i + 1) });
        running++;
    }

    function workerDone(e) {
        running--;

        if (running === 0) {
            performance.measure(nrOfWorkers, 'start');
            counter++;
            print(nrOfWorkers.toString(), size);

            if (counter == 5) {
                if (size < 1000000) {
                    counter = 0;
                    test1(size * 2);
                }
            } else {
                webWorkers(nrOfWorkers * 2, size);
            }
        }
    }
}

const createRow = (size) => {
    row = document.createElement("tr");
    row.innerHTML = `<td>${size.toLocaleString()}</td>
                     <td> <div class="loader"></div> </td>
                     <td>-</td>
                     <td>-</td>
                     <td>-</td>
                     <td>-</td>
                     <td>-</td>`;

    let table = document.getElementsByTagName("table")[0].getElementsByTagName('tbody')[0];
    table.append(row);

    active = 1;
}

const test1 = (i) => {
    createRow(i);

    zeroWorkers(i);
    webWorkers(1, i);
}


document.onload = test1(10000);