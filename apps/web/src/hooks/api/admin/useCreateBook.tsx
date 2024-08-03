'use client';

import { useToast } from '@/components/ui/use-toast';
import { axiosInstance } from '@/lib/axios';
import { Book, IFormBook } from '@/types/book.types';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FileWithPath } from 'react-dropzone';

const useCreateBlog = () => {
  const router = useRouter();
  const { toast } = useToast();

  const createBlog = async (payload: IFormBook) => {
    try {
      const { title, category, description, stock, thumbnail, userId } =
        payload;

      const createBookForm = new FormData();

      createBookForm.append('title', title);
      createBookForm.append('category', category);
      createBookForm.append('description', description);
      createBookForm.append('stock', String(stock));
      createBookForm.append('userId', String(userId));

      thumbnail.forEach((file: FileWithPath) => {
        createBookForm.append('thumbnail', file);
      });

      await axiosInstance.post<Book>('/admin/create-book', createBookForm);
      toast({
        title: "Buku sukses dibuat",
        duration: 5000,
      });  
      router.replace('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
            description: error.response?.data,
            variant: 'destructive',
          });
      }
    }
  };
  return { createBlog };
};

export default useCreateBlog;
