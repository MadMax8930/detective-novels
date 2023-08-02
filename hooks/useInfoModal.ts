import { create } from 'zustand'

export interface ModalStoreInterface {
   novelId?: string;
   isOpen: boolean;
   openModal: (novelId: string) => void;
   closeModal: () => void;
};

const useInfoModal = create<ModalStoreInterface>((set) => ({
   novelId: undefined,
   isOpen: false,
   openModal: (novelId: string) => set({ isOpen: true, novelId: novelId }),
   closeModal: () => set({ isOpen: false, novelId: undefined })
}));

export default useInfoModal;
