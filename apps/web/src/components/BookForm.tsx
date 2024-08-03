'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useGetRentBooks from '@/hooks/api/books/useGetRentBooks';
import { format } from 'date-fns';

const BookForm = () => {
  const { data } = useGetRentBooks({});

  return (
    <section>
      <Table>
        <TableHeader className="bg-slate-200">
          <TableRow>
            <TableHead className="w-[300px]">No</TableHead>
            <TableHead className="w-[200px]">Nama</TableHead>
            <TableHead className="w-[200px]">Buku</TableHead>
            <TableHead className="w-[200px]">Tanggal Pinjam</TableHead>
            <TableHead className="w-[200px]">Tanggal Kembali</TableHead>
            <TableHead className="w-[200px]">Status Pinjaman</TableHead>
          </TableRow>
        </TableHeader>

        {data.map((rent, i) => (
          <TableBody key={i}>
            <TableRow>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{rent.user.fullName}</TableCell>
              <TableCell>{rent.book.title}</TableCell>
              <TableCell>{format(new Date(rent?.rentStartDate), 'dd MMMM yyyy')}</TableCell>
              <TableCell>{format(new Date(rent?.rentEndDate), 'dd MMMM yyyy')}</TableCell>
              <TableCell>{rent.returned}</TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </section>
  );
};

export default BookForm;
