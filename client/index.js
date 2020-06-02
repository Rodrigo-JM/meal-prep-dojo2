import React from 'react'
import ReactDOM from 'react-dom'
import {DndProvider} from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import LandingPage from './LandingPage'
import {Provider} from 'react-redux'
import store from './store/store.js'

ReactDOM.render(
  <Provider store={store}>
    <DndProvider backend={Backend}>
      <LandingPage />
    </DndProvider>
  </Provider>,
  document.getElementById('root')
)
