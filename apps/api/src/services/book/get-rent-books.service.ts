import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.types';
import { Prisma } from '@prisma/client';

interface GetRentBooksQuery extends PaginationQueryParams {
  search: string;
}

export const getRentBooksService = async (query: GetRentBooksQuery) => {
  try {
    const { page, take, search } = query;

    const whereClause: Prisma.RentBooksWhereInput = {
      book: { title: { contains: search } },
    };

    const rentBooks = await prisma.rentBooks.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take: take,
      include: { user: true, book: true },
    });

    const count = await prisma.rentBooks.count({ where: whereClause });

    return {
      data: rentBooks,
      meta: { page, take, total: count },
    };
  } catch (error) {
    throw error;
  }
};
