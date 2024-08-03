'use client';

import NavbarHome from '@/components/NavbarHome';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import useGetBook from '@/hooks/api/admin/useGetBook';
import useRentBooks from '@/hooks/api/books/useRentBooks';
import { useAppSelector } from '@/redux/hooks';
import { appConfig } from '@/utils/config';
import Image from 'next/image';

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = useAppSelector((state) => state.user);
  const { book } = useGetBook(Number(params.id));
  const { rentBook } = useRentBooks();

  const handleRentBook = (userId: number, bookId: any) => {
    rentBook(userId, bookId);
  };

  return (
    <section className="padding-container max-container">
      <NavbarHome />
      <div className="mb-20 mt-36 flex flex-col items-center justify-center px-3 md:flex-row md:justify-between md:px-12">
        <Card className="relative ml-0 h-80 w-80 md:ml-4 md:w-[500px] md:h-[650px]">
          <Image
            src={appConfig.baseUrl + `/assets/${book?.thumbnail}`}
            alt="Image"
            fill
            objectFit="cover"
          />
        </Card>
        <div className="mt-3 flex flex-col text-left md:mt-0">
          <div className="flex justify-start">
            <Badge className="bg-green-600 w-auto text-center mt-2">
              {book?.category}
            </Badge>
          </div>
          <h1 className="text-xl text-gray-500">{book?.title}</h1>

          <Separator className="mt-5" />
          <div className="flex flex-col gap-2 py-4 text-slate-500">
            <span className="max-w-[450px]">{book?.description} cm</span>
            <span>
              Jika ingin bertanya lebih lanjut, bisa mengirimkan pesan ke Admin
              kami
            </span>
            <button>
              <Image
                src="/whatsapp.svg"
                alt="Whatsapp Icon"
                width={30}
                height={30}
              />
            </button>
            <span>Stock: {book?.stock}</span>
          </div>
          <h1 className='max-w-[450px]'>Note: Setiap orang hanya boleh meminjam 1 buku & Max peminjaman 7 hari</h1>
          <Separator className="mt-3" />
          <Button onClick={() => handleRentBook(id, book?.id)}>
            Pinjam Buku
          </Button>
        </div>
      </div>
      <Separator />
    </section>
  );
};

export default Page;
