import { render } from 'preact'
import { App } from './app'
// Normalize CSS for base CSS across browsers
import 'normalize.css'
import './index.css'

render(<App />, document.getElementById('app')!)
