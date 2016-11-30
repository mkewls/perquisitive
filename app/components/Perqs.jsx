// import redux, react
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router'
import Query from './Query'
import { queryDestroyer, resultDestroyer } from '../reducers/dispatchers'

// -=-=-=-=-= COMPONENT =-=-=-=-=-=-

export class Perqs extends Component {

  render() {

    const { queries, destroyQuery, destroyResults } = this.props

    return (
      <div>
        <div className="container">
          <div className="col s12 m8 offset-m2 center-align">
            <h4>My Perqs</h4>
          </div>
          <div className="col s12">
              { queries.map((query, idx) => {
                if (query.results === undefined) {
                  query.results = []
                }
                return (
                  <Query
                    key={ idx }
                    id={ query.id }
                    title={ query.title }
                    handles={ query.handles }
                    terms={ query.terms }
                    results={ query.results }
                    destroyQuery={ destroyQuery }
                    destroyResults={ destroyResults }
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

const mapState = ({ queries }) => ({ queries })

const mapDispatch = (dispatch) => ({
  destroyQuery: (queryId) => {
    dispatch(queryDestroyer(queryId))
  },
  destroyResult: (queryId, resultId) => {
    dispatch(resultDestroyer(queryId, resultId))
  }
})

export default connect(mapState, mapDispatch)(Perqs)
