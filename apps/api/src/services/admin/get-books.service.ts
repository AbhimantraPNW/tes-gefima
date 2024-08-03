import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.types';
import { Prisma } from '@prisma/client';

interface GetBooksQuery extends PaginationQueryParams {
  search: string;
}

export const getBooksService = async (query: GetBooksQuery) => {
  try {
    const { page, sortBy, sortOrder, take, search } = query;
    const whereClause: Prisma.BookWhereInput = {
      title: { contains: search },
      deletedAt: null,
    };
    
    const books = await prisma.book.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: { user: true },
    });

    const count = await prisma.book.count({ where: whereClause });

    return {
      data: books,
      meta: { page, take, total: count },
    };
  } catch (error) {
    throw error;
  }
};
