import { useToast } from '@/components/ui/use-toast';
import { axiosInstance } from '@/lib/axios';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface FormRentBooksProps {
  userId: string;
  bookId: string;
  rentStartDate: Date;
}

const useCreateFormRentBooks = () => {
  const router = useRouter();
  const { toast } = useToast();

  const createFormRentBooks = async (formData: FormRentBooksProps) => {
    try {
      await axiosInstance.post('/admin/form-rent', formData);
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
  return { createFormRentBooks };
};

export default useCreateFormRentBooks;
