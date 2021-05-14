import { useRef } from 'preact/hooks'
import { Logo } from './logo'
import useVisualizer from './useVisualizer';
import {
  bubbleSort,
  insertionSort,
  selectionSort
} from "./algorithms"

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { drawAlgorithm } = useVisualizer(canvasRef)
  const draw = (algorithm: Parameters<typeof drawAlgorithm>[0]) => {
    return () => drawAlgorithm(algorithm)
  }
  return (
    <>
    <h1>Sort Visualizer</h1>
    <main>
      <canvas width="480" height="480" className="visualizer" ref={canvasRef}></canvas>
      <div class="stack">
          <button onClick={draw(bubbleSort)}>Bubble Sort</button>
          <button onClick={draw(insertionSort)}>Insertion Sort</button>
          <button onClick={draw(selectionSort)}>Selection Sort</button>
      </div>
    </main>
    </>
  )
}
