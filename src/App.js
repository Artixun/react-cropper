import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from 'pages/Home'
// import About from 'pages/About'

import 'assets/scss/app.scss'
import AppBar from 'components/AppBar'

export class App extends Component {
  render () {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <Router>
          <AppBar />
          <Switch>
            <Route path="/" exact component={Home} />
            {/* <Route path="/about" exact component={About} /> */}
          </Switch>
          <p className="w-100 text-center text-secondary"> Developed with <span role="img" aria-label="love">❤️</span> by Our Small Team Artixun </p>
        </Router>
      </div>
    )
  }
}

export default App
