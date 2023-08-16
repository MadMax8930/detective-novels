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

export interface AdminCrudNovelProps {
   useCreate: (token: string) => (novelData: NovelProps) => Promise<any>;
   useDelete: (token: string) => (novelId: string) => Promise<any>;
   useUpdate: (token: string) => (novelId: string, updatedData: NovelProps) => Promise<any>;
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

export interface NovelDBProps {
   id?: string;
   title: string;
   description: string;
   author: string;
   preview: string;
   content: string;
   genre: string;
   coverImage: string;
   adminId?: string;
};

export interface CarouselProps {
   novels: Array<NovelDBProps>;
   adminPage: boolean;
   handleAdminSelectedNovelId?: (novelId: string) => void;
};

export interface AdminFormProps {
   token: string;
   adminSelectedNovelId?: string;
   reFetchedUpdatedList?: () => void;
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

export type AdminJwtPayload = {
   adminId: string;
};