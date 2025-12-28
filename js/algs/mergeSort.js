/**
 * Merge Sort with Visualization
 * @param {number[]} arr - Array to sort (in-place)
 * @param {Function} visualize - async callback for rendering
 */
export async function mergeSort(arr, visualize) {
    await mergeSortHelper(arr, 0, arr.length - 1, visualize);
}

async function mergeSortHelper(arr, left, right, visualize) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSortHelper(arr, left, mid, visualize);
        await mergeSortHelper(arr, mid + 1, right, visualize);
        await merge(arr, left, mid, right, visualize);
    }
}

async function merge(arr, left, mid, right, visualize) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
        await visualize(arr, [left + i, mid + 1 + j]);

        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }

    while (i < leftArr.length) {
        await visualize(arr, [left + i]);
        arr[k] = leftArr[i];
        i++;
        k++;
    }

    while (j < rightArr.length) {
        await visualize(arr, [mid + 1 + j]);
        arr[k] = rightArr[j];
        j++;
        k++;
    }

    await visualize(arr, []);
}