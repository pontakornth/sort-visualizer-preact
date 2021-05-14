import { Logo } from './logo'

export function App() {
  return (
    <>
    <h1>Sort Visualizer</h1>
    <main>
      <canvas width="480" height="480"></canvas>
      <div class="stack">
          <button>Bubble Sort</button>
          <button>Insertion Sort</button>
          <button>Selection Sort</button>
      </div>
    </main>
    </>
  )
}
