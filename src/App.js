import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from 'pages/Home'
import About from 'pages/About'

import 'assets/scss/app.scss'
import AppBar from 'components/AppBar'

export class App extends Component {
  render () {
    return (
      <Router>
        <AppBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
        </Switch>
      </Router>
    )
  }
}

export default App
