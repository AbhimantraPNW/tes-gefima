'use client';

import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from './ui/button';
import { appConfig } from '@/utils/config';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useGetBooks from '@/hooks/api/admin/useGetBooks';
import { Badge } from './ui/badge';

const Collection = () => {
  const { data: books, meta } = useGetBooks({
    page: 1,
    take: 12,
  });

  console.log(books)
  return (
    <section className="padding-container max-container">
      <div className="flex flex-col justify-center text-center">
        <div className="mt-10 text-3xl">PILIH BUKU SESUKAMU</div>

        <div className="font-bold">LIST BOOKS</div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {/* Card */}
        {books.map((book, i) => (
          <div key={i} className="flex flex-col">
            <Link href={`/${book.id}`}>
            <Card className="relative h-80 w-full cursor-pointer">
              <Image
                src={appConfig.baseUrl + `/assets${book.thumbnail}`}
                alt="Image"
                fill
                objectFit="cover"
              />
            </Card>
            </Link>
            <div className='flex justify-center items-center flex-col'>
            <Badge className='bg-green-600 w-auto text-center mt-2'>{book.category}</Badge>
            <h1 className="text-center">{book.title}</h1>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collection;
