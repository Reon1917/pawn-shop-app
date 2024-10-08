import { useState, useEffect } from 'react';
import GoldPriceTable from './goldpricetable'; // Ensure the path is correct
import GoldPriceUpdateModal from '../components/goldpriceupdate'; // Ensure the path is correct
import goldPrices from '../data/gold-price.json'; // Ensure the path is correct
import './stylesheets/inputForm.css'; // Ensure the path is correct

function GoldInfoInput() {
  const [goldQuality, setGoldQuality] = useState('18');
  const [goldWeight, setGoldWeight] = useState('');
  const [goldPrice, setGoldPrice] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedPrices, setUpdatedPrices] = useState([]);
  const [possibleLoan, setPossibleLoan] = useState(null);
  const [error, setError] = useState({ goldWeight: '', goldPrice: '' });

  useEffect(() => {
    const purity = `${goldQuality}K`;
    const priceData = updatedPrices.find(price => price.purity === purity) || goldPrices.gold_prices.find(price => price.purity === purity);
    if (priceData) {
      setGoldPrice(priceData.price_per_gram_thb);
    }
  }, [goldQuality, updatedPrices]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let hasError = false;
    const newError = { goldWeight: '', goldPrice: '' };

    if (goldWeight <= 0) {
      newError.goldWeight = goldWeight === 0 ? 'Please enter a value' : 'Please enter a valid value';
      hasError = true;
    }

    if (goldPrice <= 0) {
      newError.goldPrice = goldPrice === 0 ? 'Please enter a value' : 'Please enter a valid value';
      hasError = true;
    }

    setError(newError);

    if (!hasError) {
      const loanAmount = goldWeight * goldPrice;
      setPossibleLoan(loanAmount);
      console.log(`Gold Quality: ${goldQuality}, Gold Weight: ${goldWeight} grams, Gold Price: ${goldPrice}, Possible Loan: ${loanAmount}`);
    }
  };

  const handleUpdate = (quality, newPrice) => {
    const purity = `${quality}K`;
    setUpdatedPrices(prev => [...prev.filter(up => up.purity !== purity), { purity, price_per_gram_thb: newPrice }]);
  };

  return (
    <div className="container">
      <div className="content">
        <div className="table-container">
          <GoldPriceTable updatedPrices={updatedPrices} />
          <button onClick={() => setIsModalOpen(true)}>Update Gold Price</button>
        </div>
        <form onSubmit={handleSubmit} className="form-container">
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
            {error.goldWeight && <p style={{ color: 'red' }}>{error.goldWeight}</p>}
          </div>
          <div>
            <label htmlFor="goldPrice">Gold Price (THB per gram):</label>
            <span id="goldPrice">{goldPrice}</span>
            {error.goldPrice && <p style={{ color: 'red' }}>{error.goldPrice}</p>}
          </div>
          <button type="submit">Submit</button>
          {possibleLoan !== null && (
            <div className="loan-amount">
              <h3>The shop can offer up to:</h3>
              <p>{possibleLoan.toFixed(2)} THB</p>
            </div>
          )}
        </form>
        <GoldPriceUpdateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
}

export default GoldInfoInput;