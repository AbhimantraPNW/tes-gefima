'use client';

import BookCollection from '@/components/BookCollection';
import HeroCarousel from '@/components/HeroCarousel';
import NavbarHome from '@/components/NavbarHome';

export default function Home() {
  return (
    <>
      <NavbarHome />
      <HeroCarousel />
      <BookCollection />
    </>
  );
}
