/**
 * Radix Sort with Visualization (works best for positive integers)
 * @param {number[]} arr - Array to sort (in-place)
 * @param {Function} visualize - async callback for rendering
 */
export async function radixSort(arr, visualize) {
    const max = Math.max(...arr);
    let exp = 1;

    while (max / exp > 1) {
        await countingSortByDigit(arr, exp, visualize);
        exp *= 10;
    }
}

async function countingSortByDigit(arr, exp, visualize) {
    const output = new Array(arr.length);
    const count = new Array(10).fill(0);

    // Count occurrences
    for (let i = 0; i < arr.length; i++) {
        const index = Math.floor(arr[i] / exp) % 10;
        count[index]++;
    }

    // Change count[i] so that it contains actual position
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        const index = Math.floor(arr[i] / exp) % 10;
        output[count[index] - 1] = arr[i];
        count[index]--;
        await visualize(arr, [i]);
    }

    // Copy output back to arr
    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
        await visualize(arr, [i]);
    }
}