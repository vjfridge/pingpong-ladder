import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import queryString from "query-string";
import 'bootstrap/dist/css/bootstrap.min.css';

import CreateChallenge from './components/create-challenge.component';
import CreatePlayer from './components/create-player.component';
import EditPlayer from './components/edit-player.component';
import HomePage from './components/home-page.component';

import logo from './fridge-icon.png';

class App extends Component {
  componentDidMount() {
    var query = queryString.parse(this.props.location.search);
    console.log('query.token:'+query.token);
    if (query.token) {
      window.localStorage.setItem("jwt", query.token);
      this.props.history.push("/");
    }
  }

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
              <ul className='navbar-nav ml-auto'>
                <li className='navbar-item'>
                  <a href="/auth/google" className="button">
                    <div>
                      <span className="svgIcon t-popup-svg">
                        <svg
                          className="svgIcon-use"
                          width="25"
                          height="37"
                          viewBox="0 0 25 25"
                        >
                          <g fill="none" fillRule="evenodd">
                            <path
                              d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                              fill="#4285F4"
                            />
                            <path
                              d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                              fill="#34A853"
                            />
                            <path
                              d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                              fill="#EA4335"
                            />
                          </g>
                        </svg>
                      </span>
                      <span className="button-label">Sign in with Google</span>
                    </div>
                  </a>
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
