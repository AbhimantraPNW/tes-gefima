import BookForm from '@/components/BookForm';
import BookRentForm from '@/components/BookRentForm';
import BookReturnForm from '@/components/BookReturnForm';
import NavbarHome from '@/components/NavbarHome';
import React from 'react';

const Page = () => {
  return (
    <>
      <NavbarHome />
      <main className="mt-20 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
        <section className="w-full mx-auto bg-white p-8 rounded-lg shadow-lg max-w-7xl">
          <h1 className="text-center text-3xl font-bold text-gray-800 mb-10">Form Jurnal Buku</h1>

          <div className="mb-10">
            <BookRentForm />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: BookReturnForm */}
            <div className="lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md flex flex-col justify-between">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Return Book</h2>
              <BookReturnForm />
            </div>

            {/* Right: BookForm */}
            <div className="lg:w-2/3 bg-gray-50 p-6 rounded-lg shadow-md flex flex-col justify-between">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Add/Edit Book</h2>
              <BookForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
  