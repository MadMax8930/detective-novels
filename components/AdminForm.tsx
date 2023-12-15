import React, { useState, useEffect } from 'react'
import { NovelProps, NovelDBProps } from '@/types'
import useAdminCrud from '@/hooks/useAdminCrud'
import useNovel from '@/hooks/useNovel'
import { Input, Button } from '@/components'
import { toast } from 'react-hot-toast'
import { AdminFormProps } from '@/types'
import { DEFAULT_COVER } from '@/constants'

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
           coverImage: novel.coverImage || DEFAULT_COVER,
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
        setShowDeleteConfirmation(false);
      } else if (fetchedNovelData) {
        setNovel(fetchedNovelData);
      }
   }, [fetchedNovelData, isCreating]);

   return (
      <div className="admin-form-container">
         <form onSubmit={submitForm}>
            <div className="admin-card">      
               <div className="admin-form-header">
                  <h1 className="admin-form-state">{isCreating ? 'Creating New Novel' : 'Updating Existing Novel'}</h1>
                  <Button title={isCreating ? 'Switch to Update' : 'Switch to Create'} btnType="button" action={() => setIsCreating(!isCreating)} additionalStyles="admin-button" />
               </div>
               <div className="grid md:grid-cols-2 grid-cols-1 md:gap-1.5 gap-3">
                  <Input id="title" name="title" label="Title" value={novel.title} onChange={handleInputChange} adminPage={true} />
                  <Input id="author" name="author" label="Author" value={novel.author} onChange={handleInputChange} adminPage={true} />
                  <Input id="genre" name="genre" label="Genre" value={novel.genre} onChange={handleInputChange} adminPage={true} />
                  <Input id="coverImage" name="coverImage" label="Thumbnail" value={novel.coverImage} onChange={handleInputChange} adminPage={true} />
               </div>
               <div className="mt-1.5 pb-2">
                  <textarea id="description" name="description" placeholder="Description" rows={2} value={novel.description} onChange={handleInputChange} className="admin-textarea" />      
                  <textarea id="preview" name="preview" placeholder="Preview" rows={5} value={novel.preview} onChange={handleInputChange} className="admin-textarea" />
                  <textarea id="content" name="content" placeholder="Content" rows={15} value={novel.content} onChange={handleInputChange} className="admin-textarea" />
               </div>
               <div className="flex justify-between gap-3 md:text-lg text-base mt-2 pb-4">
                  <Button title={isCreating ? 'Create Novel' : 'Update Novel'} btnType="submit" action={submitForm} additionalStyles={isCreating ? 'admin-button-create w-full' : 'admin-button-update w-1/2'} />
                  {!isCreating && adminSelectedNovelId && (
                  <Button title="Delete Novel" btnType="button" action={handleDeleteConfirmation} additionalStyles="admin-button-delete w-1/2" />)}
               </div>
               <div className="flex justify-center">
                  {showDeleteConfirmation && (
                     <div className="flex flex-col gap-2">
                        <p className="text-white-main">Are you sure you want to delete this novel?</p>
                        <div className="flex justify-center space-x-2">
                           <Button title="Cancel" btnType="button" action={() => setShowDeleteConfirmation(false)} additionalStyles="admin-button-update" />
                           <Button title="Confirm" btnType="button" action={handleDeleteNovel} additionalStyles="admin-button-delete" />
                        </div>
                     </div>
                  )} 
               </div>     
            </div>
         </form>
      </div>
   )
}

export default AdminForm