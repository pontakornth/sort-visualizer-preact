import { Algorithm } from '../useVisualizer'
const bubbleSort: Algorithm = (arr, pushQueue) => {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[i]) {
                pushQueue({
                    arr: [...arr],
                    colorIndexes: [i, j]
                })
                const temp = arr[j]
                arr[j] = arr[i]
                arr[i] = temp
            }
        }
    }
    pushQueue({
        arr: [...arr],
        colorIndexes: []
    })
}


export default bubbleSort