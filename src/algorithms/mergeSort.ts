import { Algorithm } from "../useVisualizer"
function merge(arr: number[], start: number, mid: number, end: number, pushQueue: Parameters<Algorithm>[1]) {
    // [start, mid] First Section to merge
    // [mid + 1, stop] Second section to merge
    let tempArray: number[] = [...Array(end - start + 1).keys()]
    const left = arr.slice(start, mid + 1)
    const right = arr.slice(mid + 1, end  + 1)

    let tempIndex = 0
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            tempArray.push(left[0])
            left.shift()
        } else {
            tempArray.push(right[0])
            right.shift()
        }
    }

    tempArray = [...tempArray, ...left, ...right]

    for (let l = start; l <= end; l++) {
        // console.log([...arr], l - start)
        arr[l] = tempArray[l - start]
        pushQueue({
            arr: [...arr],
            colorIndexes: [l]
        })
    }
}

const mergeSort: Algorithm = (arr, pushQueue) => {
    function mergeSortInner(arr: number[], start: number, end: number) {
        if (start < end) {
            let mid = Math.floor((start + end) / 2)
            mergeSortInner(arr, start, mid)
            console.log(`Sort from ${start} to ${mid}`)
            mergeSortInner(arr, mid + 1, end)
            console.log(`Sort from ${mid + 1} to ${end}`)
            merge(arr, start, mid, end, pushQueue)
        }
    }
    mergeSortInner(arr, 0, arr.length - 1)
    pushQueue({
        arr: [...arr],
        colorIndexes: []
    })
    console.log(arr)
}

export default mergeSort