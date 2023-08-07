import React from 'react'
import { FaPaypal } from 'react-icons/fa'
import { SiBuymeacoffee } from 'react-icons/si'

const Donations: React.FC = () => {
  return (
    <div className="donations-container">
      <div className="donation-item buymeacoffee">
        <a
          href="https://www.buymeacoffee.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiBuymeacoffee size={64} />
          <p>Buy me a coffee</p>
        </a>
      </div>
      <div className="donation-item paypal">
        <a
          href="https://www.paypal.com/donate?business=yourpaypalbusinessid"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaPaypal size={64} />
          <p>Support my work with PayPal</p>
        </a>
      </div>
    </div>
  );
};

export default Donations