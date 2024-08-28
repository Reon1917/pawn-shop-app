import React from 'react';
import { Link } from 'react-router-dom';
import './stylesheets/navbar.css'; // Ensure the path is correct

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Loan Estimation</Link></li>
        <li><Link to="/pawn-slip-registration">Pawn Slip Registration</Link></li>
        <li><Link to="/interest-calculation">Interest Calculation</Link></li>
        <li><Link to="/monthly-report">Monthly Report</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;