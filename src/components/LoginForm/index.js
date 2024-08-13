import React, {Component} from 'react'

import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginForm extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUserName = () => {
    const {username} = this.state

    return (
      <>
        <label htmlFor="username" className="input-label">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="input-box"
          value={username}
          onChange={this.onChangeUserName}
          placeholder="UserName"
        />
      </>
    )
  }

  renderPasswordView = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="input-label">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="input-box"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  render() {
    const {showError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <form className="login-form-container" onSubmit={this.onSubmitForm}>
          <h1 className="login-heading">Login Resturant</h1>
          <div className="input-container">{this.renderUserName()}</div>
          <div className="input-container">{this.renderPasswordView()}</div>
          <button className="login-button" type="submit">
            Login
          </button>
          {showError && <p className="error-msg">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
