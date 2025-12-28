/**
 * Bogo Sort (highly inefficient) with visualization
 * Repeatedly shuffles until the array is sorted.
 * @param {number[]} arr - Array to sort (in-place)
 * @param {Function} visualize - async callback for rendering
 */
export async function bogoSort(arr, visualize) {
    function isSorted(a) {
        for (let i = 1; i < a.length; i++) {
            if (a[i - 1] > a[i]) return false;
        }
        return true;
    }

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
    }

    // Keep shuffling until sorted. This is intentionally naive.
    // Call visualize after each shuffle so the UI updates.
    let attempts = 0;
    while (!isSorted(arr)) {
        shuffle(arr);
        attempts++;
        await visualize(arr);
        // Safety: avoid locking the browser for extremely large runs
        if (attempts % 10000 === 0) {
            // yield to event loop
            await visualize(arr, []);
        }
    }

    await visualize(arr);
}
