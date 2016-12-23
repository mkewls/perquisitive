// import redux, react
import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Navbar extends Component {

  render() {

    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper blue lighten-2">
            <Link to="/" className="brand-logo"> Perquisitive</Link>
            <Link data-activates="mobile-menu" className="button-collapse">
              <i className="material-icons">menu</i>
            </Link>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/myperqs">My Perqs</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}
