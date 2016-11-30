// import redux, react
import { connect } from 'react-redux'
import React, { Component } from 'react'
import CreateForm from './CreateForm'
import { formatQuery } from '../reducers/dispatchers'


// -=-=-=-= COMPONENT =-=-=-=-

export class Create extends Component {

  render() {

    const { queryBuilder } = this.props

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src="images/chargingbull.png" />
              </div>
              <div className="card-content">
                <span className="card-title blue-text text-lighten-2">Crafting Cocktails from a Firehose</span>
                  <p>Welcome to Perquisitive, where we'll help you keep up with the endless flow of real-time
                  information from Twitter by empowering you with a new level of filtering capability
                  and useful notifications. Perquisitive allows you to choose what's important and provides
                  you SMS notifications to act on data in real-time without being tethered to your
                  timeline. Perquisitive is actionable information for everyone. Rewards for the curious.</p>
              </div>
              <div className="card-action activator">
                <span className="blue-text text-lighten-2 activator">Let's Begin</span>
              </div>
              <CreateForm queryBuilder={ queryBuilder } />
            </div>
          </div>
        </div>

      </div>
    )
  }
}

// -=-=-=-= CONTAINER =-=-=-=

const mapState = (state) => ({
  state
})

const mapDispatch = (dispatch) => ({
  queryBuilder: (query) => {
    dispatch(formatQuery(query))
  }
})

export default connect(mapState, mapDispatch)(Create)
