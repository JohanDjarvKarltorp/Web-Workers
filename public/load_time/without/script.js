let p;

let intensiveWorkLoad = () => {
    let i;
    for (i = 0; i < 8000000000; i++) {}

    p = document.createElement("p");
    p.innerHTML = "done\n";

    return i;
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
intensiveWorkLoad();

window.onload = () => {

    document.body.prepend(p);

    performance.measure('this');

    let duration = performance.getEntriesByType('measure')[0].duration;

    let time = document.createElement("p");
    time.innerHTML = `window.onload is ready after: ${duration} ms`;
    document.body.prepend(time);
}