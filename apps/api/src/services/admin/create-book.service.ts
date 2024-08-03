import prisma from '@/prisma';
import { Book } from '@prisma/client';

interface CreateBookBody
  extends Omit<
    Book,
    'id' | 'deletedAt' | 'createdAt' | 'updatedAt' | 'thumbnail' | 'content'
  > {}

export const createBookService = async (
  body: CreateBookBody,
  file: Express.Multer.File,
) => {
  try {
    const { title, stock, userId } = body;

    const existingTitle = await prisma.book.findFirst({
      where: { title },
    });

    if (existingTitle) {
      throw new Error('Title already in use');
    }

    const user = await prisma.user.findFirst({ where: { id: Number(userId) } });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.role === 'Admin') {
      return await prisma.book.create({
        data: {
          ...body,
          stock: Number(stock),
          thumbnail: `/images/${file.filename}`,
          userId: Number(userId),
        },
      });
    }
  } catch (error) {
    throw error;
  }
};
