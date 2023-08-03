import { Navbar, Footer } from '@/components'
import NovelList from '@/components/NovelList'
import useNovelList from '@/hooks/useNovelList'
// import InfoModal from '@/components/InfoModal'
// import useInfoModal from '@/hooks/useInfoModal'

export default function Home() {
   const { data: novels = [] } = useNovelList();
   // const { isOpen, closeModal } = useInfoModal();

   return (
      <div className='h-[100vh] flex items-center justify-center bg-white-main'>
         <div className='container h-full mx-auto xl:px-30 max-w-6xl'>
            {/* <InfoModal visible={isOpen} onClose={closeModal} /> */}
            <Navbar />
            <div className='h-[100px]'></div>
            <NovelList header="Novels Trending Now" data={novels} />
            <Footer />
         </div>
      </div>
   )
}
