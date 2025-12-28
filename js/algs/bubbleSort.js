/**
 * Bubble Sort
 * @param {number[]} arr - Array to sort (in-place)
 * @param {Function} visualize - async callback for rendering
 */
export async function bubbleSort(arr, visualize) {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;

        for (let j = 0; j < n - i - 1; j++) {
            // Highlight bars being compared
            await visualize(arr, [j, j + 1]);

            if (arr[j] > arr[j + 1]) {
                // Swap values
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                swapped = true;

                // Visualize after swap
                await visualize(arr, [j, j + 1]);
            }
        }

        // Optimization: stop if already sorted
        if (!swapped) break;
    }

    // Final render (optional but nice)
    await visualize(arr);
}
