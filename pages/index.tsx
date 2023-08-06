import { Navbar, Footer } from '@/components'
import useNovelList from '@/hooks/useNovelList'
import useInfoModal from '@/hooks/useInfoModal'
import NovelList from '@/components/NovelList'
import InfoModal from '@/components/InfoModal'

export default function Home() {
   const { data: novels = [] } = useNovelList();
   const { isOpen, closeModal } = useInfoModal();

   return (
      <div className='flex items-center justify-center bg-white-main'>
         <div className='container h-full mx-auto xl:px-30 max-w-6xl'>
            <InfoModal visible={isOpen} onClose={closeModal} />
            <Navbar />
            <div className='h-[150px]'></div>
            <NovelList header="Novels Trending Now" data={novels} />
            <div className='h-[40px]'></div>
            <Footer bgLight={true} />
         </div>
      </div>
   )
}
