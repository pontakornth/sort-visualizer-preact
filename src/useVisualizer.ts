import { StateUpdater, useState } from "preact/hooks"
import shuffle from "./shuffle"
type BarSpec = {
    arr: number[], // Array to draw
    colorIndexes: number[], // Index to have colors
    color?: string // Color of the index
}

type Algorithm = (arr: number[], setQueue: StateUpdater<BarSpec[]>) => void

function useVisualizer  (canvasRef: HTMLCanvasElement) {
    // CTX will not be null
    const ctx = canvasRef.getContext("2d")!!
    const [queue, setQueue] = useState<BarSpec[]>([])
    const [timeoutQueue, setTimeoutQueue] = useState<number[]>([])
    const [samepleLength, setSampleLength] = useState<number>(16)

    function clearCanvas() {
        ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
    }

    function clearTimeoutQueue() {
        timeoutQueue.forEach(x => clearTimeout(x))
        clearCanvas()
        setTimeoutQueue([])
        setQueue([])
    }


    function drawBars(spec: BarSpec) {
        clearCanvas();
        ctx.fillStyle = spec.color || "green"
        const rectangleWidth = canvasRef.width / spec.arr.length;
        for (let i = 0; i < spec.arr.length; i++) {
            const startX = rectangleWidth * i;
            const width = rectangleWidth;
            const startY = 480 - (spec.arr[i] / spec.arr.length) * 480 - spec.arr.length;
            const height = 480;
            ctx.strokeRect(startX, startY, width, height);
            if (spec.colorIndexes.includes(i)) {
                ctx.fillRect(startX, startY, width, height);
            }
        }
    }

    function drawSatisfication(setQueue: StateUpdater<BarSpec[]>) {
        throw new Error("Function not implemented.")
    }

    function drawAlgorithm(algorithm: Algorithm) {
        clearTimeoutQueue()
        const arr = shuffle([...Array(samepleLength).keys()])
        algorithm(arr, setQueue)
        drawSatisfication(setQueue)

        setQueue(queue => [...queue, {arr: [...Array(samepleLength).keys()], colorIndexes: []}])
        // Animate
        queue.forEach((v, i) => {
            const handle = setTimeout(() => drawBars(v), i * 40)
            setTimeoutQueue(timeoutQueue => [...timeoutQueue, handle])
        })
    }

}

export default useVisualizer