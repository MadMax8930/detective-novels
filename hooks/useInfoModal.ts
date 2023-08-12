import { create } from 'zustand'
import { ModalStoreProps } from '@/types'

const useInfoModal = create<ModalStoreProps>((set) => ({
   novelId: undefined,
   isOpen: false,
   openModal: (novelId: string) => set({ isOpen: true, novelId: novelId }),
   closeModal: () => set({ isOpen: false, novelId: undefined })
}));

export default useInfoModal;
