import React from 'react';
import Logo from '../../images/logo.png';
import { Link } from 'react-router-dom';

export default function Header() {
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
