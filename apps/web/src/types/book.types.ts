import { RentBook } from "./rent-book.types";
import { User } from "./user.types";

export interface Book {
  id: number;
  title: string;
  category: string;
  content: string;
  description: string;
  thumbnail: string;
  status: string;
  stock: number;
  userId: number;
  rentBooks: RentBook[]
  images: { url: string }[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  user: User;
}

export interface IFormBook {
  title: string;
  category: string;
  stock: string;
  description: string;
  thumbnail: File[];
  userId?: number;
}
