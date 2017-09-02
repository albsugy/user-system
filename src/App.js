import React, {Component} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'

// styles
import './styles/main.css'

// Routes
import Routes from './routes'

// Components
import NavBar from './components/NavBar'
import Footer from './components/Footer'

class App extends Component {
  render () {
    return (
      <Router>
        <div className='Wrapper'>
          <NavBar />
          <Routes />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
