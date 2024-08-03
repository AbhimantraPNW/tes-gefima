'use client';

import Dropzone from '@/components/Dropzone';
import FormInput from '@/components/FormInput';
import FormTextArea from '@/components/FormTextArea';
import NavbarHome from '@/components/NavbarHome';
import PreviewImages from '@/components/PreviewImages';
import { Button } from '@/components/ui/button';
import useCreateBlog from '@/hooks/api/admin/useCreateBook';
import { useAppSelector } from '@/redux/hooks';
import { IFormBook } from '@/types/book.types';
import { useFormik } from 'formik';

const Write = () => {
  const { createBlog } = useCreateBlog();
  const { id } = useAppSelector((state) => state.user);

  const {
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormik<IFormBook>({
    initialValues: {
      title: '',
      category: '',
      stock: '',
      thumbnail: [],
      description: '',
    },
    onSubmit: (values) => {
      createBlog({ ...values, userId: id });
    },
  });

  return (
    <>
      <NavbarHome />
      <div className='mt-32'>
        <h1 className="text-3xl font-bold text-center text-gray-800">Bikin Buku Baru</h1>
        <p className="text-center text-gray-500 mt-2">Silakan isi form di bawah untuk menambahkan buku baru</p>
      </div>
      <div className="container mx-auto px-4 mt-8">
        <form onSubmit={handleSubmit}>
          <div className="mx-auto flex max-w-3xl flex-col gap-6 p-6 bg-white rounded-lg shadow-md">
            <FormInput
              name="title"
              error={errors.title}
              isError={!!touched.title && !!errors.title}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Title"
              type="title"
              value={values.title}
              label="Title"
            />
            <FormInput
              name="category"
              error={errors.category}
              isError={!!touched.category && !!errors.category}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Category"
              type="category"
              value={values.category}
              label="Category"
            />
            <FormInput
              name="stock"
              error={errors.stock}
              isError={!!touched.stock && !!errors.stock}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Stock"
              type="number"
              value={values.stock}
              label="Stock"
            />
            <FormTextArea
              name="description"
              error={errors.description}
              isError={!!touched.description && !!errors.description}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Description"
              value={values.description}
              label="Description"
            />
            <PreviewImages
              fileImages={values.thumbnail}
              onRemoveImage={(idx: number) =>
                setFieldValue('thumbnail', values.thumbnail.toSpliced(idx, 1))
              }
            />
            <Dropzone
              isError={Boolean(errors.thumbnail)}
              label="Thumbnail"
              onDrop={(files) =>
                setFieldValue('thumbnail', [
                  ...values.thumbnail,
                  ...files.map((file) => file),
                ])
              }
            />

            <div className="flex justify-end mt-4">
              <Button type="submit" className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Write;
