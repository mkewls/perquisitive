// import redux, react
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router'
import Query from './Query'
import { queryDestroyer } from '../reducers/queries'
import { resultDestroyer } from '../reducers/results'

// -=-=-=-=-= COMPONENT =-=-=-=-=-=-

export class Perqs extends Component {

  render() {

    const { queries, results, destroyQuery, destroyResult } = this.props

    return (
      <div>
        <div className="container">
          <div className="col s12 m8 offset-m2 center-align">
            <h4>My Perqs</h4>
          </div>
          <div className="col s12">
              { queries.map((query) => {
                  return (
                    <Query
                      key={ query.id }
                      id={ query.id }
                      title={ query.title }
                      handles={ query.handles }
                      terms={ query.terms }
                      results={ results }
                      destroyQuery={ destroyQuery }
                      destroyResult={ destroyResult }
                    />
                )})
              }
          </div>
        </div>
      </div>
    )
  }
}

// -=-=-=-=-=-= CONTAINER =-=-=-=-=-=-=-

const mapState = ({ queries, results }) => ({ queries, results })

const mapDispatch = (dispatch) => ({
  destroyQuery: (queryId) => {
    dispatch(queryDestroyer(queryId))
  },
  destroyResult: (queryId, resultId) => {
    dispatch(resultDestroyer(queryId, resultId))
  }
})

export default connect(mapState, mapDispatch)(Perqs)
