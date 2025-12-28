/**
 * Insertion Sort with Visualization
 * @param {number[]} arr - Array to sort (in-place)
 * @param {Function} visualize - async callback for rendering
 */
export async function insertionSort(arr, visualize) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            await visualize(arr, [j, j + 1]);
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;
        await visualize(arr, [j + 1]);
    }

    await visualize(arr);
}