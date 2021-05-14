import { useRef } from 'preact/hooks'
import { Logo } from './logo'
import useVisualizer from './useVisualizer';
import {
  bubbleSort,
  insertionSort,
  selectionSort,
  mergeSort,
} from "./algorithms"
import { JSX } from 'preact';

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { drawAlgorithm, samepleLength, setSampleLength } = useVisualizer(canvasRef)
  const draw = (algorithm: Parameters<typeof drawAlgorithm>[0]) => {
    return () => drawAlgorithm(algorithm)
  }
  const clamp = (n: number): number => {
    return Math.min(Math.max(n, 16), 64)
  }

  const handleChange = (e: any) => {
    setSampleLength(clamp(parseInt(e.target.value)) || 16)
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
          <button onClick={draw(mergeSort)}>Merge Sort</button>
          <label for="length">Sample length</label>
          <input type="number" name="length" value={samepleLength} onChange={handleChange} min={16} max={32}></input>
      </div>
    </main>
    </>
  )
}
