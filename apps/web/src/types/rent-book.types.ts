import { Book } from "./book.types";
import { User } from "./user.types";

export interface RentBook {
    bookId: number;
    userId: number;
    rentStartDate: Date;
    rentEndDate: Date;
    returned: boolean;

    book: Book;
    user: User;
  }