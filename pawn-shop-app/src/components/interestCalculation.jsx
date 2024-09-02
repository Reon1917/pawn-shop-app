import React, { useState, useEffect } from 'react';
import registerData from '../data/register.json'; // Ensure the path is correct
import './stylesheets/interestCalculation.css'; // Import the CSS file

const InterestCalculation = () => {
  const [pawnID, setPawnID] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [months, setMonths] = useState('');
  const [error, setError] = useState('');
  const [pawnItems, setPawnItems] = useState(() => {
    const savedItems = localStorage.getItem('pawnItems');
    return savedItems ? JSON.parse(savedItems) : registerData.pawnItems;
  });

  useEffect(() => {
    localStorage.setItem('pawnItems', JSON.stringify(pawnItems));
  }, [pawnItems]);

  const handleCalculate = () => {
    const pawnItem = pawnItems.find((item) => item.pawnID === pawnID);

    if (!pawnItem) {
      setError('Pawn ID does not exist');
      return;
    }

    if (pawnItem.loanPaid) {
      setError('Loan is already paid');
      return;
    }

    // const today = new Date();
    const today = new Date('2024-07-26'); // For testing purposes
    const pawnDate = new Date(pawnItem.date);

    const diffTime = today - pawnDate; // Difference in milliseconds
    const diffDays = diffTime / (1000 * 60 * 60 * 24); // Convert to days

    let diffMonths;
    if (diffDays < 30.44) {
      // If within one month, consider it as 1 month
      diffMonths = 1;
    } else {
      const fullMonths = Math.floor(diffDays / 30.44); // Calculate full months
      const remainingDays = diffDays % 30.44; // Days remaining after full months

      if (remainingDays <= 7) {
        // If within the first 7 days of the new month
        diffMonths = fullMonths + 0.5;
      } else {
        diffMonths = fullMonths + 1;
      }
    }

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

    const interest = (pawnItem.loanAmount * rate * diffMonths).toFixed(2); // Calculate interest
    const totalPayment = (parseFloat(pawnItem.loanAmount) + parseFloat(interest)).toFixed(2);

    setInterestRate(rate);
    setLoanAmount(pawnItem.loanAmount);
    setMonths(diffMonths);
    setTotalPayment(totalPayment);
    setError('');
  };

  const handleLoanPaid = () => {
    setPawnItems(prevItems =>
      prevItems.map(item =>
        item.pawnID === pawnID ? { ...item, loanPaid: true } : item
      )
    );
  };

  const pawnItem = pawnItems.find(item => item.pawnID === pawnID);

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
          <p>Total Interest: {(loanAmount * interestRate * months).toFixed(2)} THB</p>
          <p>Total Payment: {loanAmount + (loanAmount * interestRate * months)} THB</p>
          <button onClick={handleLoanPaid}>Loan Paid</button>
          {pawnItem && pawnItem.loanPaid && <p style={{ color: 'green' }}>Loan has been marked as paid.</p>}
        </div>
      )}
    </div>
  );
};

export default InterestCalculation;