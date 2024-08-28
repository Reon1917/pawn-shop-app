import React, { useState } from 'react';
import registerData from '../data/register.json'; // Ensure the path is correct
import './stylesheets/interestCalculation.css'; // Import the CSS file

const InterestCalculation = () => {
  const [pawnID, setPawnID] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [months, setMonths] = useState('');
  const [error, setError] = useState('');
  const [loanPaid, setLoanPaid] = useState(false);

  const handleCalculate = () => {
    const pawnItem = registerData.pawnItems.find(item => item.pawnID === pawnID);

    if (!pawnItem) {
      setError('Pawn ID is not in the JSON file');
      return;
    }

    if (pawnItem.loanPaid) {
      setError('Loan is already paid');
      return;
    }

    const today = new Date();
    const pawnDate = new Date(pawnItem.date);
    const diffTime = Math.abs(today - pawnDate);
    const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30.44); // Approximate month calculation

    if (diffMonths > 5) {
      setError('Loan period is longer than 5 months');
      return;
    }

    let rate;
    if (pawnItem.loanAmount < 5000) {
      rate = 0.04;
    } else if (pawnItem.loanAmount < 10000) {
      rate = 0.035;
    } else {
      rate = 0.03;
    }

    const interest = pawnItem.loanAmount * rate * Math.ceil(diffMonths * 2) / 2; // Round up to nearest half month
    const totalPayment = pawnItem.loanAmount + interest;

    setInterestRate(rate);
    setLoanAmount(pawnItem.loanAmount);
    setMonths(Math.ceil(diffMonths * 2) / 2);
    setError('');
    setLoanPaid(pawnItem.loanPaid);
  };

  const handleLoanPaid = () => {
    setLoanPaid(true);
  };

  return (
    <div className="card">
      <h1>Interest Calculation</h1>
      <div>
        <label htmlFor="pawnID">Pawn ID:</label>
        <input
          type="text"
          id="pawnID"
          value={pawnID}
          onChange={(e) => setPawnID(e.target.value)}
        />
        <button onClick={handleCalculate}>Calculate</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && loanAmount && (
        <div>
          <p>Loan Amount: {loanAmount} THB</p>
          <p>Interest Rate: <input type="text" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} /></p>
          <p>Months: {months}</p>
          <p>Total Interest: {loanAmount * interestRate * months} THB</p>
          <p>Total Payment: {loanAmount + (loanAmount * interestRate * months)} THB</p>
          <button onClick={handleLoanPaid}>Loan Paid</button>
          {loanPaid && <p style={{ color: 'green' }}>Loan has been marked as paid.</p>}
        </div>
      )}
    </div>
  );
};

export default InterestCalculation;