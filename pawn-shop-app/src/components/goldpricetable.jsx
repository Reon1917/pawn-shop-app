import React, { useState, useEffect } from 'react';
import goldPricesData from '../data/gold-price.json';
import './stylesheets/goldpricetable.css'; // Ensure the path is correct

function GoldPriceTable({ updatedPrices }) {
  const [goldPrices, setGoldPrices] = useState(goldPricesData.gold_prices);

  useEffect(() => {
    if (updatedPrices) {
      const newGoldPrices = goldPrices.map(price => {
        const updatedPrice = updatedPrices.find(up => up.purity === price.purity);
        return updatedPrice ? { ...price, price_per_gram_thb: updatedPrice.price_per_gram_thb } : price;
      });
      setGoldPrices(newGoldPrices);
    }
  }, [updatedPrices]);

  return (
    <table>
      <thead>
        <tr>
          <th>Purity</th>
          <th>Price per Gram (THB)</th>
        </tr>
      </thead>
      <tbody>
        {goldPrices.map((price, index) => (
          <tr key={index}>
            <td>{price.purity}</td>
            <td>{price.price_per_gram_thb}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default GoldPriceTable;