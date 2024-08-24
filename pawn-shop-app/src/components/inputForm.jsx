import { useState, useEffect } from 'react';
import GoldPriceTable from './goldpricetable'; // Ensure the path is correct
import GoldPriceUpdateModal from '../components/goldpriceupdate'; // Ensure the path is correct
import goldPrices from '../data/gold-price.json'; // Ensure the path is correct

function GoldInfoInput() {
  const [goldQuality, setGoldQuality] = useState('18');
  const [goldWeight, setGoldWeight] = useState('');
  const [goldPrice, setGoldPrice] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedPrices, setUpdatedPrices] = useState([]);
  const [possibleLoan, setPossibleLoan] = useState(null);

  useEffect(() => {
    const purity = `${goldQuality}K`;
    const priceData = updatedPrices.find(price => price.purity === purity) || goldPrices.gold_prices.find(price => price.purity === purity);
    if (priceData) {
      setGoldPrice(priceData.price_per_gram_thb);
    }
  }, [goldQuality, updatedPrices]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const loanAmount = goldWeight * goldPrice;
    setPossibleLoan(loanAmount);
    console.log(`Gold Quality: ${goldQuality}, Gold Weight: ${goldWeight} grams, Gold Price: ${goldPrice}, Possible Loan: ${loanAmount}`);
  };

  const handleUpdate = (quality, newPrice) => {
    const purity = `${quality}K`;
    setUpdatedPrices(prev => [...prev.filter(up => up.purity !== purity), { purity, price_per_gram_thb: newPrice }]);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: '20px' }}>
        <GoldPriceTable updatedPrices={updatedPrices} />
        <button onClick={() => setIsModalOpen(true)}>Gold Price Update</button>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
          <label htmlFor="goldWeight">Gold Weight (grams):</label>
          <input
            type="number"
            id="goldWeight"
            value={goldWeight}
            onChange={(e) => setGoldWeight(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="goldPrice">Gold Price (THB per gram):</label>
          <span id="goldPrice">{goldPrice}</span>
        </div>
        <button type="submit">Submit</button>
        {possibleLoan !== null && (
          <div style={{ marginTop: '20px', padding: '10px', border: '2px solid #4CAF50', borderRadius: '5px', backgroundColor: 'black', textAlign: 'center' }}>
            <h3 style={{ color: '#4CAF50' }}>The shop can offer up to:</h3>
            <p style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{possibleLoan.toFixed(2)} THB</p>
          </div>
        )}
      </form>
      <GoldPriceUpdateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default GoldInfoInput;