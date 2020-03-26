onmessage = function(e) {

    if (e.data.begin) {
        intensiveWorkLoad();

        postMessage({ done: true });
    }
}

let intensiveWorkLoad = () => {
    let i;
    for (i = 0; i < 8000000000; i++) {}

    return i;
}