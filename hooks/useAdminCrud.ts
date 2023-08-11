import axios from 'axios';

interface Novel {
  title: string;
  description: string;
  author: string;
  preview: string;
  content: string;
  genre: string;
  coverImage: string;
}

interface AdminCrud {
  useCreateNovel: (token: string) => (novelData: Novel) => Promise<any>;
  useDeleteNovel: (token: string) => (novelId: string) => Promise<any>;
  useUpdateNovel: (token: string) => (novelId: string, updatedData: Novel) => Promise<any>;
}

const useAdminCrud = (): AdminCrud => {
   // Create Novel as Administrator
   const useCreateNovel = (token: string) => {
      const createNovel = async (novelData: Novel): Promise<any> => {
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
   const useDeleteNovel = (token: string) => {
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
   const useUpdateNovel = (token: string) => {
      const updateNovel = async (novelId: string, updatedData: Novel): Promise<any> => {
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

   return { useCreateNovel, useDeleteNovel, useUpdateNovel };
};

export default useAdminCrud