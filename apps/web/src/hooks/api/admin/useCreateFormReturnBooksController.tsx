import { useToast } from '@/components/ui/use-toast';
import { axiosInstance } from '@/lib/axios';
import { AxiosError } from 'axios';

interface FormReturnBooksProps {
  userId: string;
  bookId: string;
  returnDate: Date;
}

const useCreateFormReturnBooksController = () => {
  const { toast } = useToast();

  const createFormRent = async (formData: FormReturnBooksProps) => {
    try {
      await axiosInstance.post('/admin/form-return', formData);
      toast({
        title: 'Input sukses',
        duration: 5000,
      });

      window.location.reload();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: 'Error',
          description: error.response?.data,
          duration: 5000,
        });
      }
    }
  };
  return { createFormRent };
};

export default useCreateFormReturnBooksController;
