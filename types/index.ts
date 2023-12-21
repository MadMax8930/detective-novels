import { ReactElement, MouseEventHandler } from 'react'
import type { AppProps } from 'next/app'

export interface CustomButtonProps {
   title?: string;
   btnType?: "button" | "submit";
   additionalStyles?: string;
   textStyles?: string;
   leftIcon?: ReactElement;
   rightIcon?: ReactElement;
   isDisabled?: boolean;
   action?: MouseEventHandler<HTMLButtonElement>;
};

export interface AdminCrudNovelProps {
   useCreate: (token: string) => (novelData: NovelProps) => Promise<any>;
   useDelete: (token: string) => (novelId: string) => Promise<any>;
   useUpdate: (token: string) => (novelId: string, updatedData: NovelProps) => Promise<any>;
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

export interface NewsletterProps {
   title: string;
   content: string;
   createdAt: string;
};

export interface PaginationProps {
   totalPages: number;
   currentPage: number;
   onPageChange: (page: number) => void;
};

export interface ContentModalProps {
   visible?: boolean;
   onClose: any;
   pagination: PaginationProps;
   linesPerPage: number;
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
   adminPage: boolean;
};

export interface AdminJwtPayload {
   adminId: string;
};

export interface UserInfoProps {
   id: string;
   username: string;
   email: string;
   createdAt: string;
};

export interface DonationInfoProps {
   id: string;
   amount: number;
   donator: string;
   message: string;
   createdAt: string;
   user: { 
      id: string;
      username: string;
      email: string;
    };
};

export interface DonateResponseProps {
   status: string;
   loading: boolean;
};

export interface AuthorDataProps {
   biography: string;
   authorName: string;
   picture: string;
   favoriteBooks: string[];
   status: string;
};

export interface AdminDataParams {
   adminId?: string;
   query?: string;
   portion?: string;
};

export interface SessionUserProps {
   id: string;
   username: string;
   email: string;
   adminId: string | null;
};

export interface ProfileProps extends AppProps {
   session: SessionUserProps;
};

export interface AdminTokenProps {
   adminToken: string;
};

export interface NavbarProps {
   isUser?: boolean;
   isAdmin?: boolean;
};

export interface NoItemProps {
   variation: 'ns' | 'nf' | 'nn' | 'np';
   linkHref: string;
   title: string;
   description: string;
   imageSrc: string;
   imageAlt: string;
};

export interface TogglerProps {
   isSubscribed: boolean;
}

export interface NewsletterDBProps {
   id?: string;
   title: string;
   content: string;
   createdAt?: string;
};

export interface FavPageProps {
   currPage?: number;
   maxPage?: number;
};

export interface FavBookProps {
   id: string;
   title: string;
   description: string;
   author: string;
   preview: string;
   content: string;
   createdAt: string;
   updatedAt: string;
   genre: string;
   coverImage: string;
};