import React, { useState, useEffect } from 'react'
import { NovelProps, NovelDBProps } from '@/types'
import useAdminCrud from '@/hooks/useAdminCrud'
import useNovel from '@/hooks/useNovel'
import { Input, Button } from '@/components'
import { toast } from 'react-hot-toast'
import { AdminFormProps } from '@/types'
import { defaultCoverImage } from '@/constants'

const EMPTY_NOVEL: NovelProps = { title: '', description: '', author: '', preview: '', content: '', genre: '', coverImage: '' };
 
const AdminForm: React.FC<AdminFormProps> = ({ token, adminSelectedNovelId }) => {
   // Hooks
   const { data: fetchedNovelData } = useNovel(adminSelectedNovelId);
   const { useCreate, useDelete, useUpdate } = useAdminCrud();
   const createNovel = useCreate(token);
   const deleteNovel = useDelete(token);
   const updateNovel = useUpdate(token);

   // States
   const [novel, setNovel] = useState<NovelProps>(EMPTY_NOVEL);
   const [isCreating, setIsCreating] = useState(true);
   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

   // Inputs/TextAreas
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setNovel((prevData: NovelProps) => ({ ...prevData, [name]: value }) );
   };

   // Create/Update
   const submitForm = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         const novelData: NovelDBProps = {
           title: novel.title,
           description: novel.description,
           author: novel.author,
           preview: novel.preview,
           content: novel.content,
           genre: novel.genre,
           coverImage: novel.coverImage || defaultCoverImage,
         };

         if (adminSelectedNovelId) {
            novelData.id = adminSelectedNovelId;
            await updateNovel(adminSelectedNovelId, novelData);
            console.log('Novel updated successfully.');
            toast.success('Success! Your novel has been updated.');
          } else {
            await createNovel(novelData);
            console.log('Novel created successfully.');
            toast.success('Success! Your novel has been created.');
          }

         setNovel(EMPTY_NOVEL); // Reset the form
       } catch (error) {
         console.error('Error. Novel operation did not complete:', error);
         toast.error('An error occurred.');
       }
   };

   // Delete
   const handleDeleteNovel = async () => {
      if (adminSelectedNovelId) {
         try {
            await deleteNovel(adminSelectedNovelId);
            console.log('Novel deleted successfully.');
            toast.success('Success! Your novel has been deleted.');
            setNovel(EMPTY_NOVEL); // Reset the form
         } catch (error) {
            console.error('Error. Novel deletion did not complete:', error);
            toast.error('An error occurred while deleting the novel.');
         }
      }
      setShowDeleteConfirmation(false);
   };

   const handleDeleteConfirmation = async () => { setShowDeleteConfirmation(true) };

   // Switcher
   useEffect(() => {
      if (isCreating) {
        setNovel(EMPTY_NOVEL);
      } else if (fetchedNovelData) {
        setNovel(fetchedNovelData);
      }
   }, [fetchedNovelData, isCreating]);

   return (
      <div className="px-36 pt-4 bg-white-main rounded">
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
               <textarea id="description" name="description" placeholder="Description" rows={2} value={novel.description} onChange={handleInputChange} className="w-full px-6 pt-6 pb-1 rounded-md bg-neutral-700 text-white" />      
               <textarea id="preview" name="preview" placeholder="Preview" rows={5} value={novel.preview} onChange={handleInputChange} className="w-full px-6 pt-6 pb-1 rounded-md bg-neutral-700 text-white" />
               <textarea id="content" name="content" placeholder="Content" rows={10} value={novel.content} onChange={handleInputChange} className="w-full px-6 pt-6 pb-1 rounded-md bg-neutral-700 text-white" />
            </div>
            <div className="text-center text-lg mt-1 pb-8">
               {/* Create/Update button */}
               <Button
                  title={isCreating ? 'Create Novel' : 'Update Novel'}
                  btnType="submit"
                  additionalStyles="bg-blue-500 text-white rounded-full min-w-[200px] p-4"
                  action={submitForm}
               />
               {/* Delete/Confirmation button */}
               {!isCreating && adminSelectedNovelId && (
                  <>
                     <Button
                        title="Delete Novel"
                        btnType="button"
                        additionalStyles="bg-red-500 text-white rounded-full min-w-[200px] p-4 ml-4"
                        action={handleDeleteConfirmation}
                     />
                     {showDeleteConfirmation && (
                        <div className="mt-2">
                           <p>Are you sure you want to delete this novel?</p>
                           <Button
                              title="Confirm Delete"
                              btnType="button"
                              additionalStyles="bg-red-500 text-white rounded-full px-4 py-2 mt-2"
                              action={handleDeleteNovel}
                           />
                        </div>
                     )}
                  </>
               )}
            </div>
         </form>
      </div>
   )
}

export default AdminForm