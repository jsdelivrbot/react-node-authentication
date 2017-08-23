import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Header extends Component {
  renderLinks () {
    if (this.props.authenticated) {
      // sign out link
      return (
        <li className='nav-item'>
          <Link className='nav-link' to='/signout'>Sign Out</Link>
        </li>
      )
    } else {
      // sign in link
      return ([
        <li key='signinlink' className='nav-item'>
          <Link className='nav-link' to='/signin'>Sign In</Link>
        </li>,
        <li key='signoutlink' className='nav-item'>
          <Link className='nav-link' to='/signup'>Sign Up</Link>
        </li>
      ])
    }
  }

  render () {
    return (
      <nav className='navbar navbar-light'>
        <Link to='/' className='navbar-brand'>Redux/Node Auth</Link>
        <ul className='nav navbar-nav'>
          { this.renderLinks() }
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
})

export default connect(mapStateToProps)(Header)
