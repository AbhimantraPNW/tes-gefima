import prisma from '@/prisma';

export const getBookService = async (id: number) => {
  try {
    const blog = await prisma.book.findFirst({
      where: { id, deletedAt: null },
      include: { user: true },
    });

    if (!blog) {
      throw new Error('Blog not found');
    }

    return blog;
  } catch (error) {
    throw error;
  }
};
