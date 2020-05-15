import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from 'pages/Home'
import About from 'pages/About'

import 'assets/scss/app.scss'

export class App extends Component {
  render () {
    return (
      <Router>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
        </Switch>
      </Router>
    )
  }
}

export default App
