import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { Home } from './components/home/home'
import { NavigationBar } from './components/navigation-bar/navigation-bar'

export const App = () => {
  return (
    <Router>
      <div>
        <NavigationBar />

        <hr />

        <Switch>
          <Route exact path='/' render={() => <Redirect to='/select-team' />} />
          <Route path='/select-team' component={Home} />
          <Route path='*' render={() => <Redirect to='/select-team' />} />
        </Switch>
      </div>
    </Router>
  )
}
