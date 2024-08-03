import { AdminController } from '@/controllers/admin.controller';
import { verifyToken } from '@/lib/jwt';
import { uploader } from '@/lib/uploader';
import { Router } from 'express';

export class AdminRouter {
  private router: Router;
  private adminController: AdminController;

  constructor() {
    this.adminController = new AdminController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/books', this.adminController.getBooksController)
    this.router.get('/books/:id', this.adminController.getBookController)
    this.router.post(
      '/create-book',
      verifyToken,
      uploader('IMG', '/images').array('thumbnail', 1),
      this.adminController.createBookController,
    )
    this.router.post(
      '/form-return',
      verifyToken,
      this.adminController.createFormReturnBooksController,
    );
    this.router.post(
      '/form-rent',
      verifyToken,
      this.adminController.createFormRentBooksController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
