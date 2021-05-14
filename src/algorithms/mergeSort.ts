import { Algorithm } from "../useVisualizer"
function merge(arr: number[], start: number, mid: number, end: number, pushQueue: Parameters<Algorithm>[1]) {
    // [start, mid] First Section to merge
    // [mid + 1, stop] Second section to merge
    const tempArray: number[] = []
    let i = start
    let j = mid + 1
    let k = 0 // Index of temporary array

    while (i <= mid && j <= end) {
        if (arr[i] <= arr[j]) {
            tempArray[k] = arr[i]
            pushQueue({
                arr: [...arr],
                colorIndexes: [i]
            })
            k++
            i++
        } else {
            tempArray[k] = arr[j]
            pushQueue({
                arr: [...arr],
                colorIndexes: [j]
            })
            k++
            j++
        }
    }

    // Left over
    while (i <= mid) {
        tempArray[k] = arr[i]
        i++
            pushQueue({
                arr: [...arr],
                colorIndexes: [i]
            })
    }

    while (j <= end) {
        tempArray[k] = arr[j]
        j++
        pushQueue({
            arr: [...arr],
            colorIndexes: [j]
        })
    }

    for (let i = start; i <= end; i++) {
        arr[i] = tempArray[i - start]
        pushQueue({
            arr: [...arr],
            colorIndexes: [i]
        })
    }
}

const mergeSort: Algorithm = (arr, pushQueue) => {
    function mergeSortInner(arr: number[], start: number, end: number) {
        if (start < end) {
            let mid = Math.floor((start + end) / 2)
            mergeSortInner(arr, start, mid)
            mergeSortInner(arr, mid + 1, end)
            merge(arr, start, mid, end, pushQueue)
        }
    }
    mergeSortInner(arr, 0, arr.length - 1)
}

export default mergeSort