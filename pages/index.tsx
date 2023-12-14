import { Loader, Navbar, Footer, NovelList, InfoModal } from '@/components'
import useNovelList from '@/hooks/useNovelList'
import useInfoModal from '@/hooks/useInfoModal'

export default function Home() {
   const { data: novels = [], isLoading } = useNovelList();
   const { isOpen, closeModal } = useInfoModal();

   return (
      <div className="w-screen min-h-full flex items-center justify-center bg-primary-light">
         {(isLoading || !novels) ? <Loader/> :
         <div className="container h-full mx-auto xl:px-30 max-w-7xl">
            <Navbar />
            <InfoModal visible={isOpen} onClose={closeModal} />
            <NovelList header="Романы сейчас в тренде" data={novels} />
            <Footer bgLight={true} />
         </div>}
      </div>
   )
}
