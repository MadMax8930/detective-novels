import { MouseEventHandler } from 'react'

export interface CustomButtonProps {
   title: string;
   btnType?: "button" | "submit";
   additionalStyles?: string;
   textStyles?: string;
   rightIcon?: string;
   isDisabled?: boolean;
   action?: MouseEventHandler<HTMLButtonElement>;
};

export interface AdminCrud {
   useCreateNovel: (token: string) => (novelData: NovelProps) => Promise<any>;
   useDeleteNovel: (token: string) => (novelId: string) => Promise<any>;
   useUpdateNovel: (token: string) => (novelId: string, updatedData: NovelProps) => Promise<any>;
};

export interface PaginationProps {
   totalPages: number;
   currentPage: number;
   onPageChange: (page: number) => void;
};

export interface NovelProps {
   title: string;
   description: string;
   author: string;
   preview: string;
   content: string;
   genre: string;
   coverImage: string;
};

export interface InfoModalProps {
   visible?: boolean;
   onClose: any;
};

export interface ModalStoreProps {
   novelId?: string;
   isOpen: boolean;
   openModal: (novelId: string) => void;
   closeModal: () => void;
};

export interface CarouselProps {
   novels: Array<any>;
   adminPage: boolean;
};

export interface InputProps {
   id: string;
   onChange: any;
   value: string;
   label: string;
   name?: string;
   type?: string;
   minLength?: number;
};