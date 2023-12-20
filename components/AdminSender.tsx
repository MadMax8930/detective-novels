import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button, Input } from '@/components'
import { BsSendCheckFill, BsSendSlash } from 'react-icons/bs'
import { NewsletterProps, NewsletterDBProps } from '@/types'
import { format } from '@/lib/dateFormat'
import { toast } from 'react-hot-toast'

const EMPTY_NEWSLETTER: NewsletterProps = { title: '', content: '', createdAt: '' };

const AdminSender = () => {
   // States
   const [newsletter, setNewsletter] = useState<NewsletterProps>(EMPTY_NEWSLETTER);
   const [showSendConfirmation, setShowSendConfirmation] = useState(false);
   const [isSending, setIsSending] = useState(false);

   // On mount
   useEffect(() => {
      const fetchLatestNewsletter = async () => {
        try {
          const response = await axios.get('/api/newsletter/latest');
          const latestNewsletter = response.data;
          setNewsletter({ ...EMPTY_NEWSLETTER, createdAt: format(latestNewsletter.createdAt, 'en-EN') });
        } catch (error) {
          console.error('Error fetching latest newsletter:', error);
        }
      };
  
      fetchLatestNewsletter();
   }, []);

   // Inputs/TextAreas
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setNewsletter((prevData: NewsletterProps) => ({ ...prevData, [name]: value }) );
   };

   const submitForm = async (e: React.FormEvent) => {
      e.preventDefault();
      setShowSendConfirmation(true);
   };

   const handleSendNewsletter = async () => {
      setIsSending(true);

      const newsletterData: NewsletterDBProps = {
         title: newsletter.title,
         content: newsletter.content,
      };

      try {
         await axios.post(`/api/newsletter/send`, newsletterData);
   
         console.log('Newsletter sent successfully.');
         toast.success('Success! Newsletter has been sent.');
         setNewsletter({ ...EMPTY_NEWSLETTER, createdAt: format(new Date().toISOString(), 'en-EN') });
         setShowSendConfirmation(false);
       } catch (error) {
         console.error('Error. Sending newsletter has failed:', error);
         toast.error('An error occurred.');
       } finally {
         setIsSending(false);
       }
   };

  return (
    <div className="admin-form-container">
      <form onSubmit={submitForm}>
         <div className="admin-card">
            <div className="admin-form-header">
               <h1 className="admin-form-state">Newsletter Section</h1>
               <span className="admin-form-state">Last sent:&nbsp;{newsletter.createdAt || 'N/A'}</span>
            </div>
            <div className="flex flex-col gap-1.5 my-6">
               <Input id="title" name="title" label="Newsletter title" value={newsletter.title} onChange={handleInputChange} adminPage={true} />  
               <textarea id="content" name="content" placeholder="Newsletter message" rows={10} value={newsletter.content} onChange={handleInputChange} className="admin-textarea" />        
            </div>
            <Button title="Send Newsletter" btnType="submit" action={() => setShowSendConfirmation(true)} isDisabled={isSending} additionalStyles='admin-button-create w-full' />
            <div className="flex justify-center pt-4">
               {showSendConfirmation && (
                  <div className="flex flex-col gap-2">
                     <p className="text-white-main">Are you sure you want to send this newsletter to all the users?</p>
                     <div className="flex justify-center space-x-2">
                        <Button title="No" btnType="button" action={() => setShowSendConfirmation(false)} additionalStyles="admin-button-update flex" leftIcon={<BsSendSlash size={19} />} />
                        <Button title="Yes" btnType="button" action={handleSendNewsletter} additionalStyles="admin-button-create flex" leftIcon={<BsSendCheckFill size={19} />} />
                     </div>
                  </div>
               )}
            </div>
         </div>
      </form>
    </div>
  )
}

export default AdminSender