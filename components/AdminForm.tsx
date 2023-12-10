import React, { useState, useEffect } from 'react'
import { NovelProps, NovelDBProps } from '@/types'
import useAdminCrud from '@/hooks/useAdminCrud'
import useNovel from '@/hooks/useNovel'
import { Input, Button } from '@/components'
import { toast } from 'react-hot-toast'
import { AdminFormProps } from '@/types'
import { defaultCoverImage } from '@/constants'

const EMPTY_NOVEL: NovelProps = { title: '', description: '', author: '', preview: '', content: '', genre: '', coverImage: '' };
 
const AdminForm: React.FC<AdminFormProps> = ({ token, adminSelectedNovelId, reFetchedUpdatedList }) => {
   // Hooks
   const { data: fetchedNovelData, mutate: reFetchedNovelData } = useNovel(adminSelectedNovelId);
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

         if (!isCreating && adminSelectedNovelId) {
            novelData.id = adminSelectedNovelId;
            await updateNovel(adminSelectedNovelId, novelData);
            console.log('Novel updated successfully.');
            toast.success('Success! Your novel has been updated.');
            reFetchedNovelData();
            setIsCreating(false);
         } else if (isCreating) {
            await createNovel(novelData);
            console.log('Novel created successfully.');
            toast.success('Success! Your novel has been created.');
            setIsCreating(true);
            setNovel(EMPTY_NOVEL); // Reset the form
         } else {
            console.log('Error, novel not selected.');
            toast.error('Select a novel to update it.');
         }
      } catch (error) {
         console.error('Error. Novel operation did not complete:', error);
         toast.error('An error occurred.');
      } finally {
         if (reFetchedUpdatedList) { reFetchedUpdatedList() };
      }
   };

   // Delete
   const handleDeleteNovel = async () => {
      if (adminSelectedNovelId) {
         try {
            await deleteNovel(adminSelectedNovelId);
            console.log('Novel deleted successfully.');
            toast.success('Success! Your novel has been deleted.');
         } catch (error) {
            console.error('Error. Novel deletion did not complete:', error);
            toast.error('An error occurred.');
         } finally {
            setIsCreating(true);
            setNovel(EMPTY_NOVEL); // Reset the form
            if (reFetchedUpdatedList) { reFetchedUpdatedList() };
         }
      }
      setShowDeleteConfirmation(false);
   };

   const handleDeleteConfirmation = () => { setShowDeleteConfirmation(true) };

   // Switcher
   useEffect(() => {
      if (isCreating) {
        setNovel(EMPTY_NOVEL);
      } else if (fetchedNovelData) {
        setNovel(fetchedNovelData);
      }
   }, [fetchedNovelData, isCreating]);

   return (
      <div className="md:px-36 sm:px-6 px-4 pt-4 bg-admin-outer rounded">
         <form onSubmit={submitForm}>
            <div className="flex md:flex-row flex-col justify-between md:items-start items-center gap-2 mb-4">
               <h1 className="pt-2 text-xl font-semibold border-primary-red border-b-4">{isCreating ? 'Create form' : 'Update form'}</h1>
               <Button
                  title={isCreating ? 'Switch to Update' : 'Switch to Create'}
                  btnType="button"
                  additionalStyles="p-2 mb-2 bg-gray-300 text-gray-700 rounded-md"
                  action={() => setIsCreating(!isCreating)}
               />
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-1.5 gap-3">
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
            <div className="flex justify-center gap-3 md:text-lg text-base mt-1 pb-8">
               {/* Create/Update/Delete buttons */}
               <Button
                  title={isCreating ? 'Create Novel' : 'Update Novel'}
                  btnType="submit"
                  additionalStyles="bg-blue-500 text-white rounded-full md:min-w-[150px] min-w-[100px] p-4"
                  action={submitForm}
               />
               {!isCreating && adminSelectedNovelId && (
               <Button
                  title="Delete Novel"
                  btnType="button"
                  additionalStyles="bg-red-500 text-white rounded-full md:min-w-[150px] min-w-[100px] p-4"
                  action={handleDeleteConfirmation}
               />
               )}
            </div>
            <div className="flex justify-center">
               {/* Delete confirmation prompt */}
               {showDeleteConfirmation && (
                  <div className="mt-1">
                     <p>Are you sure you want to delete this novel?</p>
                     <div className="flex justify-center mt-2 space-x-2">
                        <Button
                           title="Cancel"
                           btnType="button"
                           additionalStyles="bg-gray-300 text-white rounded-full px-4 py-2 mt-2"
                           action={() => setShowDeleteConfirmation(false)}
                        />
                        <Button
                           title="Confirm"
                           btnType="button"
                           additionalStyles="bg-red-500 text-white rounded-full px-4 py-2 mt-2"
                           action={handleDeleteNovel}
                        />
                     </div>
                  </div>
               )} 
            </div>
         </form>
      </div>
   )
}

export default AdminForm