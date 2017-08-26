import axios from 'axios'

import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from '../actions/types'

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
      .catch(({response}) => {
        // if invalid request
        // - show an error to user
        dispatch(authError('Bad login info'))
      })
  }
}

export function signupUser ({email, password}, history) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(res => {
        dispatch({ type: AUTH_USER })

        window.localStorage.setItem('token', res.data.token)

        history.push('/feature')
      })
      .catch((err) => {
        dispatch(authError(err.response.data.error || err.message))
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

export function fetchMessage () {
  return dispatch => {
    axios.get(ROOT_URL, {
      headers: { authorization: window.localStorage.getItem('token') }
    })
      .then(res => {
        console.log(res)
        dispatch({
          type: FETCH_MESSAGE,
          payload: res.data.message
        })
      })
      .catch((err) => {
        console.log(err.response.data.error || err.message)
      })
  }
}
