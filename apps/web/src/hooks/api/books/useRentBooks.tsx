import { useToast } from '@/components/ui/use-toast';
import { axiosInstance } from '@/lib/axios';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

const useRentBooks = () => {
  const router = useRouter()
  const { toast } = useToast();

  const rentBook = async (userId: number, bookId: number) => {
    try {
      await axiosInstance.post('/books/rent', {userId, bookId});

      toast({
        title: "Buku sukses di pinjam",
        duration: 5000,
      });  
      router.replace('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          description: error.response?.data,
          variant: 'destructive',
        });
      }
    }
  };

  return {
    rentBook,
  };
};

export default useRentBooks;
