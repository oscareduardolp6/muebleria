import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { HashRouter } from 'react-router-dom'

render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <HashRouter>
      <App />
    </HashRouter>
    {/* </BrowserRouter> */}
  </React.StrictMode>,
  document.getElementById('root')
)
