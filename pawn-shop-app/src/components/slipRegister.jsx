import React, { useEffect, useState } from 'react';
import './stylesheets/slipRegister.css'; // Import the CSS file

const PawnSlipRegistration = () => {
  const [pawnID, setPawnID] = useState('');

  useEffect(() => {
    const generatePawnID = () => {
      const randomDigits = Math.floor(100 + Math.random() * 900); // Generates a number between 100 and 999
      return `PAWN${randomDigits}`;
    };

    setPawnID(generatePawnID());
  }, []);

  return (
    <div className="card">
      <h1>Pawn Slip Registration</h1>
      <form>
        <div className="form-group">
          <label htmlFor="pawnID">Pawn ID:</label>
          <input type="text" id="pawnID" name="pawnID" value={pawnID} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="goldAmount">Gold Amount:</label>
          <input type="number" id="goldAmount" name="goldAmount" />
        </div>
        <div className="form-group">
          <label htmlFor="purity">Purity:</label>
          <input type="number" id="purity" name="purity" />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" />
        </div>
        <div className="form-group">
          <label htmlFor="customerName">Customer Name:</label>
          <input type="text" id="customerName" name="customerName" />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" />
        </div>
        <div className="form-group">
          <label htmlFor="note">Note:</label>
          <textarea id="note" name="note"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="loanAmount">Loan Amount:</label>
          <input type="number" id="loanAmount" name="loanAmount" />
        </div>
        <div className ="button">
            <button type='submit'>Save</button>
        </div>
      </form>
    </div>
  );
};

export default PawnSlipRegistration;