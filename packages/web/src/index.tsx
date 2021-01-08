import { BaseStyles } from '@primer/components'
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { theme } from './styles'


ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BaseStyles>
        <BrowserRouter>
          <Switch>
            <App />
          </Switch>
        </BrowserRouter>
      </BaseStyles>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
