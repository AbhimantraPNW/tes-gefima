import { hashPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { User } from '@prisma/client';

export const registerService = async (
  body: Pick<User, 'email' | 'fullName' | 'password' | 'rentStatus'>,
) => {
  try {
    const { email, password, rentStatus } = body;

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });
    
    if (existingUser) {
      throw new Error('Email already exist');
    }

    const hashedPassword = await hashPassword(String(password));

    const user = await prisma.user.create({
      data: { ...body, password: hashedPassword, rentStatus },
    });

    return {
      message: 'Register success',
      data: user,
    };
  } catch (error) {
    throw error;
  }
};
