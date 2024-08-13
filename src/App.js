import './App.css'
import {Component} from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'

import Dishs from './components/Dishs'
import LoginForm from './components/LoginForm'

import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Dishs} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
