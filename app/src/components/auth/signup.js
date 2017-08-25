import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { withRouter } from 'react-router-dom'

import * as actions from '../../actions'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <fieldset className='form-group'>
    <label htmlFor={input.name}>{label}</label>
    <input className='form-control' {...input} type={type} />
    { touched && error && <span className='text-danger'>{error}</span> }
  </fieldset>
)

class Signup extends Component {
  handleFormSubmit = formProps => {
    this.props.signupUser(formProps, this.props.history)
  }

  render () {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>

        <Field name='email' component={renderField} type='email' className='form-control' label='Email' />

        <Field name='password' component={renderField} type='password' className='form-control' label='Password' />

        <Field name='passwordConfirm' component={renderField} type='password' className='form-control' label='Confirm Password' />

        { this.props.errorMessage ?
          <div className="alert alert-danger">
            <strong>Oops!</strong> {this.props.errorMessage}
          </div> : null
        }
        <button action='submit' className='btn btn-primary'>Sign Up</button>
      </form>
    )
  }
}

const validate = ({ email, password, passwordConfirm }) => {
  const errors = {}

  if (!email) errors.email = 'Please enter an email'

  if (!password) errors.password = 'Please enter a password'

  if (!passwordConfirm) errors.passwordConfirm = 'Please confirm your password'

  if (password !== passwordConfirm) {
    errors.password = 'Passwords must match!'
  }

  return errors
}

const reduxFormSignup = reduxForm({
  form: 'signup',
  validate
})(Signup)

const mapStateToProps = state => ({
  errorMessage: state.auth.error
})

export default connect(mapStateToProps, actions)(withRouter(reduxFormSignup))
