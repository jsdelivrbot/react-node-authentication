import axios from 'axios'

import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../actions/types'

const ROOT_URL = '//localhost:8000'

export function signinUser ({ email, password }, history) {
  return function (dispatch) {
    // Submit email/pass to server
    axios.post(`${ROOT_URL}/signin`, {email, password})
      .then(res => {
        // if valid request .
        // - update state for authed user
        dispatch({ type: AUTH_USER })
        // - save JWT token
        window.localStorage.setItem('token', res.data.token)
        // - redirect
        history.push('/feature')
      })
      .catch(err => {
        // if invalid request
        // - show an error to user
        dispatch(authError('Bad login info'))
      })
  }
}

export function signoutUser () {
  window.localStorage.removeItem('token')

  return { type: UNAUTH_USER }
}

export function authError (error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
