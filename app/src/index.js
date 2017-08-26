import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { HashRouter, Route, Switch } from 'react-router-dom'
import reduxThunk from 'redux-thunk'

import App from './components/app'
import Signin from './components/auth/signin'
import Signout from './components/auth/signout'
import Signup from './components/auth/signup'
import Feature from './components/feature'
import RequireAuth from './components/auth/require_auth'
import Welcome from './components/welcome'
import reducers from './reducers'
import { AUTH_USER } from './actions/types'

require('../style/style.scss')

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(reduxThunk)
))

const token = localStorage.getItem('token')

if (token) {
  store.dispatch({ type: AUTH_USER })
}

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App>
        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/signout' component={Signout} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/feature' component={RequireAuth(Feature)} />
        </Switch>
      </App>
    </HashRouter>
  </Provider>
  , document.querySelector('.container'))
