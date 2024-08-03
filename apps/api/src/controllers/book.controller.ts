import { getRentBooksService } from '@/services/book/get-rent-books.service';
import { rentBookService } from '@/services/book/rent-book.service';
import { NextFunction, Request, Response } from 'express';

export class BookController {
  async rentBookController(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, bookId } = req.body;

      const result = await rentBookService(Number(userId), Number(bookId));
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getRentBooksController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        take: parseInt(req.query.take as string) || 10,
        page: parseInt(req.query.page as string) || 1,
        sortBy: (req.query.sortBy as string) || 'createdAt',
        sortOrder: (req.query.sortOrder as string) || 'desc',
        search: (req.query.search as string) || '',
      };
      
      const result = await getRentBooksService(query);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
