import prisma from '@/prisma';
import { Book, RentBooks } from '@prisma/client';

interface FormRentBookProps extends Pick<RentBooks, 'userId' | 'bookId'> {
  rentStartDate: Date;
}

export const createFormRentBooksService = async (body: FormRentBookProps) => {
  try {
    const { userId, bookId, rentStartDate } = body;

    const user = await prisma.user.findFirst({
      where: { id: Number(userId), rentStatus: 'Free' },
    });

    if (!user) {
      throw new Error('User masih dalam status pinjaman');
    }

    const rentBook = await prisma.book.findFirst({
      where: { id: Number(bookId), stock: { gt: 0 } },
      include: { rent: true },
    });

    if (!rentBook) {
      throw new Error('Buku masih dipinjam');
    }

    const existingRent = await prisma.rentBooks.findFirst({
      where: {
        bookId: Number(bookId),
        userId: Number(userId),
        returned: 'MasihDiPinjam',
      },
    });

    if (existingRent) {
      throw new Error('User lain sedang meminjam buku ini');
    }

    const rentStartDateObj = new Date(rentStartDate);

    const rentFinishDate = new Date(
      rentStartDateObj.getTime() + 7 * 24 * 60 * 60 * 1000,
    );

    await prisma.$transaction([
      prisma.rentBooks.deleteMany({
        where: { bookId: Number(bookId), userId: Number(userId) },
      }),

      prisma.rentBooks.create({
        data: {
          userId: Number(userId),
          bookId: Number(bookId),
          rentStartDate: rentStartDate,
          rentEndDate: rentFinishDate,
          returned: 'MasihDiPinjam',
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

    return { message: 'Rent book sucesfully' };
  } catch (error) {
    throw error;
  }
};
