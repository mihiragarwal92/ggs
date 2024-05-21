import React, { useState } from 'react';

function Calculator() {
  
  const [basePrice, setBasePrice] = useState(100);
  const [pricePerCreditLine, setPricePerCreditLine] = useState(2);
  const [pricePerCreditScorePoint, setPricePerCreditScorePoint] = useState(1);
  const [creditLines, setCreditLines] = useState([]);
  const [creditScore, setCreditScore] = useState([]);
  const [subscriptionPrice, setSubscriptionPrice] = useState(0);

  const calculateSubscriptionPrice = () => {
    const totalPrice = basePrice + (pricePerCreditLine * creditLines) + (pricePerCreditScorePoint * creditScore);
    setSubscriptionPrice(totalPrice);
  };

  return (
  <div className='calc'>
    <div>
      <h2>Subscription Price Calculator</h2>
      <div>
        <label>Base Price:</label>
        <input type="number" value={basePrice} onChange={e => setBasePrice(parseFloat(e.target.value))} />
      </div>
      <div>
        <label>Price Per Credit Line:</label>
        <input type="number" value={pricePerCreditLine} onChange={e => setPricePerCreditLine(parseFloat(e.target.value))} />
      </div>
      <div>
        <label>Price Per Credit Score Point:</label>
        <input type="number" value={pricePerCreditScorePoint} onChange={e => setPricePerCreditScorePoint(parseFloat(e.target.value))} />
      </div>
      <div>
        <label>Credit Lines:</label>
        <input type="number" value={creditLines} onChange={e => setCreditLines(parseFloat(e.target.value))} />
      </div>
      <div>
        <label>Credit Score:</label>
        <input type="number" value={creditScore} onChange={e => setCreditScore(parseFloat(e.target.value))} />
      </div>
      <button onClick={calculateSubscriptionPrice}>Calculate Subscription Price</button>
      {subscriptionPrice > 0 && (
        <div>
          <h3>Subscription Price:</h3>
          <p>${subscriptionPrice}</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default Calculator;
