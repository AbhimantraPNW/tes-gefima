'use client';

import { axiosInstance } from '@/lib/axios';
import { Book } from '@/types/book.types';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.types';
import { useEffect, useState } from 'react';

interface IGetBooksQueries extends IPaginationQueries {
  search?: string;
}

const useGetBooks = (queries: IGetBooksQueries) => {
  const [data, setData] = useState<Book[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getBooks = async () => {
    try {
      const { data } = await axiosInstance.get('/admin/books', {
        params: queries,
      });

      setData(data.data);
      setMeta(data.meta);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries?.page, queries?.search]);

  return { data, meta, isLoading };
};

export default useGetBooks;
