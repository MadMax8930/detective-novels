import React from 'react'
import { FaPaypal } from 'react-icons/fa'
import { SiBuymeacoffee } from 'react-icons/si'

const Donations: React.FC = () => {
  return (
    <div className="donations-container">
      <div className="donation-item buymeacoffee">
        <a
          href={`https://www.buymeacoffee.com/${process.env.NEXT_PUBLIC_BUYMEACOFFEE_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiBuymeacoffee size={18} />
          <span className="donation-text">Buy me a coffee</span>
        </a>
      </div>
      <div className="donation-item paypal">
        <a
          href={`https://www.paypal.com/donate?business=${process.env.NEXT_PUBLIC_PAYPAL_MERCHANT_ID}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaPaypal size={18} />
          <span className="donation-text">Support my work</span>
        </a>
      </div>
    </div>
  );
};

export default Donations