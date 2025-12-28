// ===== Imports =====
import { bubbleSort } from "./algs/bubbleSort.js";
import { bogoSort } from "./algs/bogoSort.js";
import { quickSort } from "./algs/quickSort.js";
import { mergeSort } from "./algs/mergeSort.js";
import { insertionSort } from "./algs/insertionSort.js";
import { radixSort } from "./algs/radixSort.js";

import { sleep, generateRandomArray } from "./utils.js";

// ===== DOM Elements =====
const container = document.getElementById("bars-container");
const generateBtn = document.getElementById("generate");
const sortBtn = document.getElementById("sort");
const algorithmSelect = document.getElementById("algorithm");
const sizeSlider = document.getElementById("size");
const speedSlider = document.getElementById("speed");

// ===== State =====
let array = [];
let isSorting = false;

// ===== Configuration =====
const MIN_VALUE = 5;
const MAX_VALUE = 300;

// ===== Rendering =====
function renderBars(arr, activeIndices = []) {
    container.innerHTML = "";

    arr.forEach((value, index) => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value}px`;

        if (activeIndices.includes(index)) {
            bar.classList.add("active");
        }

        container.appendChild(bar);
    });
}

// ===== Visualization Callback =====
async function visualize(arr, active = []) {
    renderBars(arr, active);
    await sleep(getDelay());
}

// ===== Helpers =====
function getDelay() {
    // Invert speed slider so higher = faster
    return 300 - speedSlider.value;
}

function generateNewArray() {
    array = generateRandomArray(
        sizeSlider.value,
        MIN_VALUE,
        MAX_VALUE
    );
    renderBars(array);
}

// ===== Sorting Dispatcher =====
async function runSort() {
    if (isSorting) return;
    isSorting = true;

    disableControls(true);

    const algorithm = algorithmSelect.value;

    switch (algorithm) {
        case "bogo":
            await bogoSort(array, visualize);
            break;
        case "bubble":
            await bubbleSort(array, visualize);
            break;
        case "quick":
            await quickSort(array, visualize);
            break;
        case "merge":
            await mergeSort(array, visualize);
            break;
        case "insertion":
            await insertionSort(array, visualize);
            break;
        case "radix":
            await radixSort(array, visualize);
            break;
        default:
            console.error("Unknown algorithm");
    }

    renderBars(array);
    disableControls(false);
    isSorting = false;
}

// ===== UI Control =====
function disableControls(disabled) {
    generateBtn.disabled = disabled;
    sortBtn.disabled = disabled;
    sizeSlider.disabled = disabled;
    algorithmSelect.disabled = disabled;
}

// ===== Event Listeners =====
generateBtn.addEventListener("click", generateNewArray);
sortBtn.addEventListener("click", runSort);
sizeSlider.addEventListener("input", () => {
    generateNewArray();
    document.getElementById("sizeValue").textContent = sizeSlider.value;
});
speedSlider.addEventListener("input", () => {
    document.getElementById("speedValue").textContent = speedSlider.value;
});

// ===== Init =====
generateNewArray();
