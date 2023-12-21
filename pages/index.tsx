import React from 'react'
import withLoading from '@/pages/_hoc'
import { LoaderLight, Navbar, Footer, NovelList, InfoModal } from '@/components'
import useNovelList from '@/hooks/useNovelList'
import useInfoModal from '@/hooks/useInfoModal'

const Home = () => {
   const { data: novels = [], isLoading } = useNovelList();
   const { isOpen, closeModal } = useInfoModal();

   return (
      <div className="home-outer">
         {(isLoading || !novels) ? <LoaderLight /> :
         <div className="home-inner">
            <Navbar />
            <InfoModal visible={isOpen} onClose={closeModal} />
            <NovelList header="Романы сейчас в тренде" data={novels} />
            <Footer bgLight={true} />
         </div>}
      </div>
   )
}

export default withLoading(Home)