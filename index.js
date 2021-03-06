// https://blog.logrocket.com/getting-started-with-webassembly-and-rust/
import * as wasm from "./pkg/hello_wasm.js";

const sum = (arr) => arr.reduce((prev, curr) => prev + curr);

const count = (arr) => arr.reduce((prev) => prev + 1, 0);

const runTest = (iterations, sizes, func) => {
    const allResults = [];
    sizes.forEach((size) => {
        const trialResults = [];
        const data = new Uint32Array([...new Array(size).keys()]);
        for (let i = 0; i < iterations; i++) {
            const start = performance.now();
            func(data);
            const end = performance.now();
            trialResults.push(end - start);
        }
        const average = sum(trialResults) / trialResults.length;
        allResults.push(average);
    });
    return allResults;
};

// Helper function for DOM manipulaiton
const createAndAppend = (elType, parentNode) => {
    const el = document.createElement(elType);
    parentNode.appendChild(el);
    return el;
};

const appendResultsToTable = (sizes, wasmResults, jsResults) => {
    const tBody = document.getElementById("results");
    for (let i = 0; i < sizes.length; i++) {
        const row = createAndAppend("tr", tBody);
        const size = createAndAppend("td", row);
        const wasmResult = createAndAppend("td", row);
        const jsResult = createAndAppend("td", row);
        const difference = createAndAppend("td", row);
        size.innerText = sizes[i].toLocaleString("en-US");
        wasmResult.innerText = wasmResults[i].toFixed(2);
        jsResult.innerText = jsResults[i].toFixed(2);
        difference.innerText = (jsResults[i] / wasmResults[i]).toFixed(2);
    }
};

wasm.default().then(() => {
    const iterations = 5;
    const sizes = [1_000, 10_000, 100_000, 1_000_000, 10_000_000, 100_000_000];
    const wasmResults = runTest(iterations, sizes, wasm.count);
    const jsResults = runTest(iterations, sizes, count);
    appendResultsToTable(sizes, wasmResults, jsResults);
    document.getElementById("loading-msg").innerText = `Complete. Each trial ran for ${iterations} iterations.`;
});
