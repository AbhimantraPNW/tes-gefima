'use client';

import { useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NAV_LINKS } from '../../constant';
import { NavLink } from '../../constant/types';
import NavbarDropdown from './NavbarDropdown';
import VerticalLine from './ui/vertical-line';
import UserProfile from './UserProfile';

const NavbarHome = () => {
  const { id } = useAppSelector((state) => state.user);
  const [navBackgroundColor, setNavBackgroundColor] = useState('white');
  const [borderBottomColor, setBorderBottomColor] = useState('#e5e7eb');
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setNavBackgroundColor('white');
      setBorderBottomColor('#e5e7eb'); // Tailwind CSS color for border-gray-200
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      className={`navbar transition-color duration-300`}
      style={{
        backgroundColor: navBackgroundColor,
        borderBottom: `1px solid ${borderBottomColor}`,
      }}
    >
      <div className="flex w-full items-center justify-between px-5 md:px-16">
        <NavbarDropdown />
        <div className="absolute md:relative left-0 text-2xl ml-5 text-red-400">
          <Link href="/">PERPUSTAKAAN</Link>
        </div>

        <div className="flex flex-row items-center gap-4">
          {NAV_LINKS.map((nav: NavLink, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setHoveredNav(nav.label)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <div className="subNav hidden md:flex">
                <Link href={nav.href}>
                  <div className="py-8">{nav.label}</div>
                </Link>
              </div>

              {/* Subnavbar */}
              {nav.subNav && hoveredNav === nav.label && (
                <div className="absolute left-0 top-full flex flex-col bg-orange-500 text-white">
                  {nav.subNav.map((sub) => (
                    <Link key={sub.subKey} href={sub.subHref}>
                      <div className="flex whitespace-nowrap px-2 py-2 text-white hover:text-black">
                        {sub.subLabel}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="ml-2">
            <VerticalLine />
          </div>

          {Boolean(id) ? (
            <div className="mr-2">
              <UserProfile />
            </div>
          ) : (
            <Link href={'/login'}>
              <Image
                src={'/person.svg'}
                alt="person logo"
                width={30}
                height={30}
                className=""
              />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default NavbarHome;
