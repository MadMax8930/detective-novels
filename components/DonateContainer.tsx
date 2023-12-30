import React from 'react'
import Link from 'next/link'
import { Button } from '@/components'
import { FaPaypal } from 'react-icons/fa'
import { SiBuymeacoffee } from 'react-icons/si'
import { SessionUserProps } from '@/types'
import { COFFEE_URL, PAYPAL_URL } from '@/constants'

const DonationContainer: React.FC<{ session: SessionUserProps }> = ({ session }) => {
  return (
    <div className="flex flex-col gap-2 pt-24 text-center bg-primary-light">
      <strong className="user-container">Welcome {session.username}</strong> 
      <div className="donations-container">
         <Link href={COFFEE_URL} passHref target="_blank" rel="noopener noreferrer">
            <Button title="Buy me a coffee" leftIcon={<SiBuymeacoffee size={18} />} additionalStyles="button-donate" />
         </Link>
         <Link href={PAYPAL_URL} passHref target="_blank" rel="noopener noreferrer">
            <Button title="Support my work" leftIcon={<FaPaypal size={18} />} additionalStyles="button-donate" />
         </Link>
      </div>
    </div>
  );
};

export default DonationContainer