import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import CreateChallenge from './components/create-challenge.component';
import CreatePlayer from './components/create-player.component';
import EditPlayer from './components/edit-player.component';
import HomePage from './components/home-page.component';

import logo from './fridge-icon.png';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <a className='navbar-brand' href='https://www.linkedin.com/in/victoria-fridge-4234b4ab' target='_blank'>
              <img src={logo} width='30' height='50' alt='Vickie Fridge LinkedIn' />
            </a>
            <Link to='/' className='navbar-brand'>Pingpong Ladder</Link>
            <div className='collapse navbar-collapse'>
              <ul className='navbar-nav mr-auto'>
                <li className='navbar-item'>
                  <Link to='/' className='nav-link'>Home</Link>
                </li>
                <li className='navbar-item'>
                  <Link to='/create/player' className='nav-link'>Create Player</Link>
                </li>
                <li className='navbar-item'>
                  <Link to='/create/challenge' className='nav-link'>Create Challenge</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path='/' exact component={HomePage} />
          <Route path='/edit/:id' component={EditPlayer} />
          <Route path='/create/player' component={CreatePlayer} />
          <Route path='/create/challenge' component={CreateChallenge} />
        </div>
      </Router>
    );
  }
}

export default App;
