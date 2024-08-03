import { createBookService } from '@/services/admin/create-book.service';
import { createFormRentBooksService } from '@/services/admin/create-form-rent-books.service';
import { createFormReturnBooksService } from '@/services/admin/create-form-return-books.service';
import { getBookService } from '@/services/admin/get-book.service';
import { getBooksService } from '@/services/admin/get-books.service';
import { NextFunction, Request, Response } from 'express';

export class AdminController {
  async createBookController(req: Request, res: Response) {
    const files = req.files as Express.Multer.File[];

    if (!files.length) {
      throw new Error('No file uploaded');
    }

    const result = await createBookService(req.body, files[0]);
    return res.status(200).send(result);
  }

  async getBookController(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id

      const result = await getBookService(Number(id));
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getBooksController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        take: parseInt(req.query.take as string) || 10,
        page: parseInt(req.query.page as string) || 1,
        sortBy: (req.query.sortBy as string) || 'createdAt',
        sortOrder: (req.query.sortOrder as string) || 'desc',
        search: (req.query.search as string) || '',
      };
      
      const result = await getBooksService(query);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async createFormReturnBooksController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await createFormReturnBooksService(
        Number(req.params.id),
        req.body
      );
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async createFormRentBooksController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await createFormRentBooksService(
        req.body
      );
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
