'use client';

import { axiosInstance } from '@/lib/axios';
import { Book } from '@/types/book.types';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

const useGetBook = (id: number) => {
  const [data, setData] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getBook = async () => {
    try {
      const { data } = await axiosInstance.get<Book>(`/admin/books/${id}`);
      setData(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { book: data, isLoading, refetch: getBook };
};

export default useGetBook;
