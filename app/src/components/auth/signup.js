import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { withRouter } from 'react-router-dom'

import * as actions from '../../actions'

class Signup extends Component {
  render () {
    return (
      <form>
        <h1>Signup</h1>
      </form>
    )
  }
}

export default Signup
