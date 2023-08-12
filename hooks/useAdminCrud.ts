import axios from 'axios'
import { AdminCrudNovelProps, NovelProps } from '@/types'

const useAdminCrud = (): AdminCrudNovelProps => {
   // Create Novel as Administrator
   const useCreate = (token: string) => {
      const createNovel = async (novelData: NovelProps): Promise<any> => {
         try {
            const response = await axios.post('/api/admin/create', novelData, {
               method: 'POST',
               headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
         } catch (error) {
            throw error;
         }
      };
      
      return createNovel;
   };

   // Delete Novel as Administrator
   const useDelete = (token: string) => {
      const deleteNovel = async (novelId: string): Promise<any> => {
         try {
            const response = await axios.delete(`/api/admin/delete?novelId=${novelId}`, {
               method: 'DELETE',
               headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
         } catch (error) {
            throw error;
         }
      };

      return deleteNovel;
   };

   // Update Novel as Administrator
   const useUpdate = (token: string) => {
      const updateNovel = async (novelId: string, updatedData: NovelProps): Promise<any> => {
         try {
            const response = await axios.put(`/api/admin/update?novelId=${novelId}`, updatedData, {
               method: 'PUT',
               headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
         } catch (error) {
            throw error;
         }
      };

      return updateNovel;
   };

   return { useCreate, useDelete, useUpdate };
};

export default useAdminCrud