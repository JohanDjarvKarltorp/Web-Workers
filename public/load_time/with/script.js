let p;

let intensiveWorkLoadWithWorker = () => {
    let worker = new Worker('worker.js');

    worker.postMessage({ begin: true });

    worker.onmessage = (e) => {
        if (e.data.done) {
            let p = document.createElement("p");
            p.innerHTML = "done\n";
            document.body.prepend(p);
        }
    }
}

let fetchTheBible = () => {
    fetch('http://localhost:8080/load_time/bible.txt')
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            let p = document.createElement("p");
            p.innerHTML = data;
            document.body.append(p);
        });
}


fetchTheBible();
intensiveWorkLoadWithWorker();

window.onload = () => {
    performance.measure('this');

    let duration = performance.getEntriesByType('measure')[0].duration;

    let p = document.createElement("p");
    p.innerHTML = `window.onload is ready after: ${duration} ms`;
    document.body.prepend(p);
}