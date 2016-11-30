// import redux, react
import React, { Component } from 'react'
import { connect } from 'react-redux'

// import NavBar, which is fixed in the App
import Navbar from './Navbar'

// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export class App extends Component {

  render () {

    return (
      <div id="main">
        <Navbar />
        <div className="row">
          { this.props.children }
        </div>
      </div>
    )
  }
}

// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

// pass the user as the 'auth' property on props
const mapState = state => ({
  state
})

export default connect(
  mapState
)(App);
