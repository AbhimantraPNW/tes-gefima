'use client';

import { axiosInstance } from '@/lib/axios';
import { Book } from '@/types/book.types';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.types';
import { RentBook } from '@/types/rent-book.types';
import { useEffect, useState } from 'react';

interface IGetRentBooksQueries extends IPaginationQueries {
  search?: string;
}

const useGetRentBooks = (queries: IGetRentBooksQueries) => {
  const [data, setData] = useState<RentBook[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getRentBooks = async () => {
    try {
      const { data } = await axiosInstance.get('/books/rent', {
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
    getRentBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries?.page, queries?.search]);

  return { data, meta, isLoading };
};

export default useGetRentBooks;
