import prisma from '@/prisma';

export const rentBookService = async (userId: number, bookId: number) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: Number(userId), rentStatus: 'Free' },
    });

    if (!user) {
      throw new Error('Status pengguna tidak sesuai untuk meminjam buku');
    }

    const book = await prisma.book.findUnique({
      where: { id: Number(bookId), stock: { gt: 0 } },
    });

    if (!book) {
      throw new Error('Buku tidak memiliki cukup stok');
    }

    const rentStartDate = new Date();
    const rentEndDate = new Date(
      rentStartDate.getTime() + 7 * 24 * 60 * 60 * 1000,
    );

    const rentBook = await prisma.$transaction([
      prisma.rentBooks.deleteMany({
        where: { bookId: Number(bookId), userId: Number(userId) },
      }),

      prisma.rentBooks.createMany({
        data: {
          userId: Number(userId),
          bookId: Number(bookId),
          rentEndDate,
          rentStartDate,
        },
      }),

      prisma.user.update({
        where: { id: Number(userId) },
        data: { rentStatus: 'Rent' },
      }),

      prisma.book.update({
        where: { id: Number(bookId) },
        data: { stock: { decrement: 1 } },
      }),
    ]);

    return rentBook;
  } catch (error) {
    throw error;
  }
};
