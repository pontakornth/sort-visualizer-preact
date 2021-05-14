import { Algorithm } from "../useVisualizer"
const selectionSort: Algorithm = (arr, pushQueue) => {
    for (let i = 0; i < arr.length - 1; i++) {
        let min_index = i
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min_index]) {
                min_index = j
            }
        }
        pushQueue({
            arr: [...arr],
            colorIndexes: [min_index, i]
        })
        const temp = arr[min_index]
        arr[min_index] = arr[i]
        arr[i] =  temp
    }
    pushQueue({
        arr: [...arr],
        colorIndexes: []
    })
}

export default selectionSort