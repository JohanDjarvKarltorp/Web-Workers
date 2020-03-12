let prime = [];

const isPrime = num => {
    for (let i = 2; i < num; i++)
        if (num % i === 0) return false;
    return num > 1;
}


onmessage = function(e) {
    for (let i = e.data.start; i < e.data.end; i++) {
        if (isPrime(i)) {
            prime.push(i);
        }
    }
    postMessage({ prime: prime });
}