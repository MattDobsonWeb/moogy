import React from 'react';
import Logo from '../../images/logo.png';

export default function Header() {
  return (
    <header>
      <div className="inner-content">
        <div className="logo-wrapper">
          <img src={Logo} alt="Moogy Logo" />
        </div>
      </div>
    </header>
  );
}
