import React, { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { DonateResponse } from '@/components'
import axios from 'axios'

const ThankYou = () => {
   const router = useRouter();
   const [status, setStatus] = useState<string>('Processing');
   const [loading, setLoading] = useState<boolean>(true);
   
   useEffect(() => {
      const fetchDataAndSubmitDonation = async () => {
        try {
          const session = await getSession();

          if (session?.user?.email) {
            const response = await axios.get('/api/current');
            const userId = response.data.id

            if (router.query.amount) {
              const donationData = {
                 amount: router.query.amount as string,
                 message: router.query.message as string,
                 donator: router.query.donator as string,
                 userId,
              }

              setLoading(true);
  
              await axios.post('/api/donation/donate', donationData)
              .then((response) => { 
                 const { success } = response.data;
                 setStatus(success ? 'Thank you for your donation!' : 'An error occurred while processing your donation.');
                 setLoading(false);
                 setTimeout(() => { router.push('/profile') }, 2000);
              })
              .catch(() => { 
                 setLoading(false);
                 setStatus('An error occurred while processing your donation.') 
              });
            } else {
               setStatus('An error occurred while processing your donation.');
            }

          }
        } catch (error) {
          console.error(error);
          setLoading(false);
          setStatus('An unexpected error occurred while processing the request.');
        }
      };
  
      fetchDataAndSubmitDonation();
    }, [router]);

   return <DonateResponse status={status} loading={loading} />;
};

export default ThankYou