import prisma from '@/prisma';
import { RentBooks } from '@prisma/client';

interface FormRentBookProps extends Pick<RentBooks, 'userId' | 'bookId'> {
  returnDate: Date;
}

export const createFormReturnBooksService = async (
  id: number,
  body: FormRentBookProps,
) => {
  try {
    const { userId, bookId, returnDate } = body;

    const user = await prisma.user.findFirst({
      where: { id: Number(userId), rentStatus: 'Rent' },
    });

    if (!user) {
      throw new Error('User tidak ditemukan');
    }

    const rentBook = await prisma.rentBooks.findFirst({
      include: { user: true, book: true },
      where: {
        returned: 'MasihDiPinjam',
        userId: Number(userId),
        bookId: Number(bookId),
      },
    });

    if (!rentBook) {
      throw new Error('Buku sudah dikembalikan');
    }

    const rentStartDate = new Date(rentBook.rentStartDate);

    const returnEstimationDate = new Date(
      rentStartDate.getTime() + 7 * 24 * 60 * 60 * 1000,
    )

    const isOnTime = returnDate <= returnEstimationDate;
    const returnStatus = isOnTime ? 'Terlambat' : 'Ontime'

    await prisma.$transaction([
      prisma.rentBooks.update({
        where: {
          bookId_userId: { bookId: rentBook.bookId, userId: rentBook.userId },
        },
        data: {
          returned: returnStatus,
          rentEndDate: returnDate,
        },
      }),

      prisma.user.update({
        where: { id: Number(userId) },
        data: { rentStatus: 'Free' },
      }),

      prisma.book.update({
        where: { id: Number(bookId) },
        data: { stock: { increment: 1 } },
      }),
    ]);

    return { message: 'Book return status update sucesfully' };
  } catch (error) {
    throw error;
  }
};
