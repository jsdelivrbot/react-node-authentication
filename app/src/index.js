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
import reducers from './reducers'

require('../style/style.scss')

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(reduxThunk)
))

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App>
        <Switch>
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/signout' component={Signout} />
          <Route exact path='/signup' component={Signup} />
        </Switch>
      </App>
    </HashRouter>
  </Provider>
  , document.querySelector('.container'))
