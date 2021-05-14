import { StateUpdater, useEffect, useState, Ref } from "preact/hooks"
import shuffle from "./shuffle"
type BarSpec = {
    arr: number[], // Array to draw
    colorIndexes: number[], // Index to have colors
    color?: string // Color of the index
}

export type Algorithm = (arr: number[], pushQueue: (spec: BarSpec) => void) => void

function useVisualizer  (canvasRef: Ref<HTMLCanvasElement>) {
    // CTX will not be null
    const [ctx, setCtx] = useState<any>(null)
    const [queue, setQueue] = useState<BarSpec[]>([])
    const [timeoutQueue, setTimeoutQueue] = useState<number[]>([])
    const [samepleLength, setSampleLength] = useState<number>(16)

    useEffect(() => {
        setCtx(canvasRef.current.getContext("2d"))
    }, [])

    function pushQueue (spec: BarSpec) {
        setQueue(queue => [...queue, spec])
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
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
        const rectangleWidth = canvasRef.current.width / spec.arr.length;
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

    function drawSatisfication() {
        const sampleArray = [...Array(samepleLength).keys()]
        for (let i = 0; i < sampleArray.length; i++) {
            ctx.fillStyle = "yellow"
           pushQueue({
                arr: sampleArray,
                colorIndexes: [...Array(i + 1).keys()],
                color: "yellow"
            })
        }
    }

    function drawAlgorithm(algorithm: Algorithm) {
        clearTimeoutQueue()
        const arr = shuffle([...Array(samepleLength).keys()])
        algorithm(arr, pushQueue)
        drawSatisfication()

        pushQueue({arr: [...Array(samepleLength).keys()], colorIndexes: []})

        // Animate
        queue.forEach((v, i) => {
            const handle = setTimeout(() => drawBars(v), i * 40)
            setTimeoutQueue(timeoutQueue => [...timeoutQueue, handle])
        })
    }

    return {
        drawAlgorithm
    }

}

export default useVisualizer
