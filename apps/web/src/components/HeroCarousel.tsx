'use client';

import { useEffect, useRef, useState } from 'react';
import { HERO_BG } from '../../constant';
import { Card, CardContent } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

const HeroCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const images = HERO_BG.map((hero) => hero.image);

  const plugin = useRef(Autoplay({ delay: 5000 }));

  const handleMouseEnter = () => {
    plugin.current.stop();
  };

  const handleMouseLeave = () => {
    plugin.current.play();
  };

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section
      className="group container mt-24 overflow-hidden p-0 md:mt-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

        <Carousel
          plugins={[plugin.current]}
          setApi={setApi}
          className="h-48 md:h-fit"
        >
          <CarouselContent className="flex">
            {images.map((image, index) => (
              <CarouselItem key={index} className="flex-shrink-0">
                <Card className="rounded-none border-none shadow-none md:rounded-lg">
                  <CardContent className="relative flex h-56 w-full items-center justify-center md:h-[550px]">
                    <Image
                      src={image}
                      alt={`Slide ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-8 bottom-0 hidden transition-all group-hover:left-4 md:flex" />
          <CarouselNext className="-right-8 bottom-0 hidden transition-all group-hover:right-4 md:flex" />
        </Carousel>

      <div>
        {Array.from({ length: count }).map((_, index) => (
          <span
            key={index}
            className={`mx-1.5 h-2 w-2 rounded-full ${current === index + 1}`}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
