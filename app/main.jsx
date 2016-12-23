// import react, redux, and react-routing
import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'

// import component containers
import AppContainer from './components/AppContainer'
import Create from './components/Create'
import Perqs from './components/Perqs'

// import dispatch fetch
import { fetchQueries } from './reducers/queries'

// onEnter for Queries
const onPerqsEnter = () => {
  store.dispatch(fetchQueries())
}

render (
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path="/" component={ AppContainer }>
                <Route path="/create" component={ Create } />
                <Route path="/myperqs" component={ Perqs } onEnter={ onPerqsEnter }/>
                <IndexRoute component={ Create } />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('main')
)
