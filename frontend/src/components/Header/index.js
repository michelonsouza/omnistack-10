import React from 'react';

import './styles.css';
import logo from '../../assets/logo-dev-radar.svg';

export default function Header() {
  return (
    <header>
      <img src={logo} alt="DevRadar"/>
    </header>
  );
}
