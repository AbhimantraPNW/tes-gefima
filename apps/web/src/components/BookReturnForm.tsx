'use client'

import useCreateFormReturnBooksController from '@/hooks/api/admin/useCreateFormReturnBooksController';
import { useFormik } from 'formik';

interface IFormReturn {
  bookId: string;
  userId: string;
  returnDate: string;
}

const BookReturnForm = () => {
  const { createFormRent } = useCreateFormReturnBooksController();

  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
  } = useFormik<IFormReturn>({
    initialValues: {
      bookId: '',
      userId: '',
      returnDate: '', 
    },
    onSubmit: (values) => {
      createFormRent({ ...values, returnDate: new Date(values.returnDate) });
    },
  });

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Return Book</h2>

      <div className="mb-6">
        <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
        <input
          id="userId"
          name="userId"
          type="number"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.userId}
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="bookId" className="block text-sm font-medium text-gray-700 mb-1">Book ID</label>
        <input
          id="bookId"
          name="bookId"
          type="number"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.bookId}
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
        <input
          id="returnDate"
          name="returnDate"
          type="date"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.returnDate}
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
        />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200">
        Submit
      </button>
    </form>
  );
};

export default BookReturnForm;
