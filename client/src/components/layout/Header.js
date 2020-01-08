import React, { Component } from 'react';
import Logo from '../../images/logo.png';
import { Link } from 'react-router-dom';

// import components
import About from '../about';
import Tech from '../tech';

class Header extends Component {
  render() {
    return (
      <header>
        <div className="inner-content">
          <div className="logo-wrapper">
            <Link to="/">
              <img src={Logo} alt="Moogy Logo" />
            </Link>
          </div>

          <div className="nav-links">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <About></About>
              </li>

              <li>
                <Tech></Tech>
              </li>

              <li>
                <Link to="/data">Data</Link>
              </li>

              <li>
                <Link to="/train">Help Train</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
