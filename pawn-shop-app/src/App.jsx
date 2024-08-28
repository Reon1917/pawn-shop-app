import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import LoanEstimation from './components/inputForm';
import PawnSlipRegistration from './components/slipRegister';
import InterestCalculation from './components/interestCalculation';
import MonthlyReport from './components/monthlyReport';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoanEstimation />} />
        <Route path="/pawn-slip-registration" element={<PawnSlipRegistration />} />
        <Route path="/interest-calculation" element={<InterestCalculation />} />
        <Route path="/monthly-report" element={<MonthlyReport />} />
      </Routes>
    </Router>
  );
};

export default App;