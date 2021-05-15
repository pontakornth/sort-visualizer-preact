import { Algorithm } from "../useVisualizer"

function partition(arr: number[], start: number, end: number, pushQueue: Parameters<Algorithm>[1]): number {
    let pivot = Math.floor((start + end) / 2)
    let left = start
    let right = end

    while (left <= right) {
        while (arr[left] < pivot) {
            left++
        }

        while (arr[right] > pivot) {
            right--
        }
        if (left <= right) {
            const temp = arr[left]
            arr[left] = arr[right]
            arr[right] = temp
            left++
            right--
            pushQueue({
                arr: [...arr],
                colorIndexes: [left, right]
            })
        }
    }
    return left
}

const quickSort: Algorithm = (arr, pushQueue) => {
    function quickSortInner(arr: number[], start: number, end: number) {
        let index
        if (arr.length > 1) {
            index = partition(arr, start, end, pushQueue)
            if (start < end) {
                quickSortInner(arr, start, index - 1)
            }
            if (index < end) {
                quickSortInner(arr, index, end)
            }
        }
    }
    quickSortInner(arr, 0, arr.length - 1)
}

export default quickSort