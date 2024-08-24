import React, { useState } from 'react';
import './stylesheets/goldpriceupdate.css'; // Ensure the path is correct

function GoldPriceUpdateModal({ isOpen, onClose, onUpdate }) {
  const [goldQuality, setGoldQuality] = useState('18');
  const [newPrice, setNewPrice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate(goldQuality, newPrice);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Update Gold Price</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="goldQuality">Gold Quality:</label>
            <select
              id="goldQuality"
              value={goldQuality}
              onChange={(e) => setGoldQuality(e.target.value)}
            >
              <option value="18">18 Karat</option>
              <option value="22">22 Karat</option>
              <option value="24">24 Karat</option>
            </select>
          </div>
          <div>
            <label htmlFor="newPrice">New Price (THB):</label>
            <input
              type="number"
              id="newPrice"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </div>
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default GoldPriceUpdateModal;