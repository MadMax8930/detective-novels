import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { NovelProps } from '@/types'
import useAdminCrud from '@/hooks/useAdminCrud'
import { Input, Button } from '@/components'
import { toast } from 'react-hot-toast'
import { defaultCoverImage } from '@/constants'
 
interface AdminFormProps {
   token: string;
}

const AdminForm: React.FC<AdminFormProps> = ({ token }) => {
   const router = useRouter();
   const novelId = router.query.novel as string;
   
   const { useCreateNovel, useDeleteNovel, useUpdateNovel } = useAdminCrud();
   const createNovel = useCreateNovel(token);
   const deleteNovel = useDeleteNovel(token);
   const updateNovel = useUpdateNovel(token);
   
   const [novel, setNovel] = useState<NovelProps>({ title: '', description: '', author: '', preview: '', content: '', genre: '', coverImage: '' });
   const [isCreating, setIsCreating] = useState(true);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setNovel((prevData) => ({ ...prevData, [name]: value }) );
   };

   const submitForm = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         const novelData: NovelProps = {
           title: novel.title,
           description: novel.description,
           author: novel.author,
           preview: novel.preview,
           content: novel.content,
           genre: novel.genre,
           coverImage: novel.coverImage || defaultCoverImage,
         };
   
         await createNovel(novelData);
   
         // Reset the form
         setNovel({ title: '', description: '', author: '', preview: '', content: '', genre: '', coverImage: '' });
         console.log('Novel created successfully.');
         toast.success('Success! Your novel has been created.');
       } catch (error) {
         console.error('Error creating novel:', error);
         toast.error('An error occurred.');
       }
   };

   return (
      <div className="px-36 bg-white-main rounded shadow">
         <form onSubmit={submitForm}>
            <div className="flex justify-between items-start">
               <h1 className="pt-2 text-xl border-primary-red border-b-4">{isCreating ? 'Create form' : 'Update form'}</h1>
               <Button
                  title={isCreating ? 'Switch to Update' : 'Switch to Create'}
                  btnType="button"
                  additionalStyles="p-2 mb-2 bg-gray-300 text-gray-700 rounded-md"
                  action={() => setIsCreating(!isCreating)}
               />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
               <Input id="title" name="title" label="Title" value={novel.title} onChange={handleInputChange} />
               <Input id="author" name="author" label="Author" value={novel.author} onChange={handleInputChange} />
               <Input id="genre" name="genre" label="Genre" value={novel.genre} onChange={handleInputChange} />
               <Input id="coverImage" name="coverImage" label="Thumbnail" value={novel.coverImage} onChange={handleInputChange} />
            </div>
            <div className="mt-1.5 pb-2">
               <textarea id="description" name="description" placeholder="Description" rows={3} value={novel.description} onChange={handleInputChange} className="w-full px-6 pt-6 pb-1 rounded-md bg-neutral-700 text-white" />      
               <textarea id="preview" name="preview" placeholder="Preview" rows={5} value={novel.preview} onChange={handleInputChange} className="w-full px-6 pt-6 pb-1 rounded-md bg-neutral-700 text-red-500" />
               <textarea id="content" name="content" placeholder="Content" rows={10} value={novel.content} onChange={handleInputChange} className="w-full px-6 pt-6 pb-1 rounded-md bg-neutral-700 text-white" />
            </div>
            <div className="text-center text-lg mt-1 pb-8">
               <Button
                  title={isCreating ? 'Create Novel' : 'Update Novel'}
                  btnType="submit"
                  additionalStyles="bg-blue-500 text-white rounded-full min-w-[200px] p-4"
                  action={submitForm}
               />
            </div>
         </form>
      </div>
   )
}

export default AdminForm