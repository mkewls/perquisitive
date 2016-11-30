// import redux, react
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router'

// -=-=-=-=-= COMPONENT =-=-=-=-=-=-

export default (props) => {

  const { id, title, handles, terms, results, destroyQuery, destroyResult } = props

  return (
    <div className="col s12 m8 offset-m2">
      <div className="card">
        <div className="card-content">
          <div className="row">
            <span className="card-title activator blue-text text-lighten-2">{ title }</span>
            <span className="red-text right" onClick={ () => destroyQuery(id) }>
              <i className="small material-icons">not_interested</i>
            </span>
            <p>Twitter Handles: { handles }</p>
            <p>Search Terms: { terms }</p>
          </div>
        </div>
        <div className="card-reveal">
          <ul className="collection">
          { results.map(tweet => (
            <li key={ tweet.handle } className="collection-item avatar">
            <img src={ tweet.imgUrl } alt={ tweet.handle } className="circle" />
            <span className="red-text right" onClick={ () => destroyResult(id, tweet.id) }>
              <i className="small material-icons">not_interested</i>
            </span>
            <p>{ tweet.text }</p>
            <span>{ tweet.timestamp }</span>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
