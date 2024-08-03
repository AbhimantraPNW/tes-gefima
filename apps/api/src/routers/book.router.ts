import { BookController } from '@/controllers/book.controller';
import { verifyToken } from '@/lib/jwt';
import { Router } from 'express';

export class BookRouter {
  private router: Router;
  private bookController: BookController;

  constructor() {
    this.bookController = new BookController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/rent', this.bookController.getRentBooksController);
    this.router.post(
      '/rent',
      verifyToken,
      this.bookController.rentBookController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
