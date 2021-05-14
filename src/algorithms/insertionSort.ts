import { Algorithm } from "../useVisualizer"
const insertionSort: Algorithm = (arr, pushQueue) => {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let prev = i - 1;
    while (key < arr[prev] && prev >= 0) {
      // Switch happen
      pushQueue({
          arr: [...arr],
          colorIndexes: [prev, prev + 1]
      })
      arr[prev + 1] = arr[prev];
      console.log([...arr]);
      prev -= 1;
    }
    pushQueue({
        arr: [...arr],
        colorIndexes: [prev + 1]
    })
    arr[prev + 1] = key;
  }
  pushQueue({
      arr: [...arr],
      colorIndexes: []
  })
}

export default insertionSort