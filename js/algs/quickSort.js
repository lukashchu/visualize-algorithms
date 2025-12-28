/**
 * Quick Sort with Visualization
 * @param {number[]} arr - Array to sort (in-place)
 * @param {Function} visualize - async callback for rendering
 */
export async function quickSort(arr, visualize) {
    await quickSortHelper(arr, 0, arr.length - 1, visualize);
}

async function quickSortHelper(arr, low, high, visualize) {
    if (low < high) {
        const pi = await partition(arr, low, high, visualize);
        await quickSortHelper(arr, low, pi - 1, visualize);
        await quickSortHelper(arr, pi + 1, high, visualize);
    }
}

async function partition(arr, low, high, visualize) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        await visualize(arr, [j, high]);

        if (arr[j] < pivot) {
            i++;
            // Swap
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            await visualize(arr, [i, j]);
        }
    }

    // Final swap
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    await visualize(arr, [i + 1, high]);

    return i + 1;
}