// import redux, react
import React, { Component } from 'react'
import { Link } from 'react-router'

export default class CreateForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      handles: '',
      terms: '',
      phone: '',
      errors: {}
    }
    this.queryBuilder = props.queryBuilder.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clearError = this.clearError.bind(this)
    this.validate = this.validate.bind(this)
  }

  onInputChange(field, value) {
    this.setState({ [field]: value })
    this.clearError(field)
  }

  clearError(field) {
    let errors = this.state.errors
    delete errors[field]
    this.setState({ errors })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    let errors = this.validate()
    if (!Object.keys(errors).length) {
      this.queryBuilder(this.state)
    }
    this.setState({ errors })
  }

  validate() {
    let errors = {}
    if (!this.state.title) errors.title = 'This field is required'
    if (!this.state.handles) errors.handles = 'This field is required'
    if (!this.state.terms) errors.terms = 'This field is required'
    if (!this.state.phone) errors.phone = 'This field is required'
    return errors
  }

  render() {

    return (
      <div className="card-reveal">
        <span className="card-title">Build Your Data Finder<i className="material-icons right">close</i></span>
        <form className="col s12" onSubmit={ this.handleSubmit }>
          <div className="row">
            <div className="input-field col s6">
              <span>Query Title</span><br/>
              <span className="error">{ this.state.errors.title }</span>
              <input
                placeholder="AT&T Merger Inside Track"
                name="queryTitle"
                type="text"
                className="validate"
                value={ this.state.title }
                onChange={ (evt) => this.onInputChange('title', evt.target.value) }
              />
            </div>
            <div className="input-field col s6">
              <span>Twitter Handles </span>
              <span className="error"> { this.state.errors.handles }</span>
              <input
                placeholder="@AP, @StockTwits"
                name="twitterHandle"
                type="text"
                value={ this.state.handles }
                onChange={ (evt) => this.onInputChange('handles', evt.target.value) }
              />
            </div>
            <div className="input-field col s6">
              <span>Search Terms </span>
              <span className="error"> { this.state.errors.terms }</span>
              <input
                placeholder="AT&T, merger, Trump"
                name="searchTerms"
                type="text"
                className="validate"
                value={ this.state.terms }
                onChange={ (evt) => this.onInputChange('terms', evt.target.value) }
              />
            </div>
            <div className="input-field col s6">
              <span>Phone Number </span>
              <span className="error"> { this.state.errors.phone }</span>
              <input
                placeholder="917-555-5555"
                name="phoneNumber"
                type="text"
                className="validate"
                value={ this.state.phone }
                onChange={ (evt) => this.onInputChange('phone', evt.target.value) }
              />
            </div>
          </div>
          <div className="row">
            <div className="divider"></div>
          </div>
          <div className="row">
            <div className="col s3">
              <button className="btn waves-effect waves-light blue lighten-2" type="submit">Build
                <i className="material-icons right">trending_up</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
