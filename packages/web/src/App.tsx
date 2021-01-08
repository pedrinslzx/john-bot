import { Button } from '@primer/components'
import React from 'react'
import { Route } from 'react-router-dom'

function App(): JSX.Element {
  return (
    <div className="App">
      <Route path="/" exact>
        <Button color="blue" children="Login" />
      </Route>
    </div>
  )
}

export default App
