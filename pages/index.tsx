import React from 'react'
import { GetServerSideProps } from 'next'
import { LoaderLight, Navbar, NovelList, InfoModal, FooterSimplified } from '@/components'
import useInfoModal from '@/hooks/useInfoModal'
import useNovelList from '@/hooks/useNovelList'
import withLoading from '@/pages/_hoc'

const novelsEndpoint = `${process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:3000'}/api/novels`;

export const getServerSideProps: GetServerSideProps = async () => {
   try {
     const response = await fetch(novelsEndpoint);
     const novelsSSR = await response.json();
     return {
       props: { novelsSSR },
     };
   } catch (error) {
     console.error('Error fetching novel list data:', error);
     return {
       props: { novelsSSR: null },
     };
   }
};

const Home: React.FC<{ novelsSSR: [] }> = ({ novelsSSR }) => {
   const { isOpen, closeModal } = useInfoModal();
   const { data: novelsCSR = [], error } = useNovelList();

   if (!novelsCSR && !error) { return <LoaderLight /> }

   return (
      <div className="home-outer">
         <div className="home-inner">
            <Navbar />
            <InfoModal visible={isOpen} onClose={closeModal} />
            <NovelList header="Романы сейчас в тренде" data={ novelsSSR || novelsCSR} />
            <FooterSimplified borderTop={false} />
         </div>
      </div>
   )
}

export default withLoading(Home)