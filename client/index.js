import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {DndProvider} from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
ReactDOM.render(
  <DndProvider backend={Backend}>
    <App />
  </DndProvider>,
  document.getElementById('root')
)
