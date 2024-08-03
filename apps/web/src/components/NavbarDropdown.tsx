'use client';

import { Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { NAV_LINKS } from '../../constant';
import { Separator } from './ui/separator';
import { SubNavLink } from '../../constant/types';

const NavbarDropdown = () => {
  const [subNavbar, setSubNavbar] = useState<string | null>(null);

  const handleClick = (key: string) => {
    setSubNavbar((prevKey) => (prevKey === key ? null : key));
  };

  return (
    <div className="dropdown-container md:hidden">
      <input type="checkbox" id="checkbox" />
      <label htmlFor="checkbox" className="toggleLabel"></label>
      <div className="menu-content">
        {NAV_LINKS.map((nav) => (
          <ul key={nav.key}>
            {nav.subNav ? (
              <li
                onClick={() => handleClick(nav.key)}
                className="subnav-item flex cursor-pointer items-center justify-between p-3"
              >
                {nav.label}
                <span
                  className={`subnav-dropdown-icon transition-transform ${
                    subNavbar === nav.key ? 'rotate-180' : ''
                  } `}
                >
                  {subNavbar === nav.key ? (
                    <Minus size={16} />
                  ) : (
                    <Plus size={16} />
                  )}
                </span>
              </li>
            ) : (
              <Link href={nav.href}>
                <li className="subnav-item ml-1 flex items-center justify-between p-3">
                  {nav.label}
                </li>
              </Link>
            )}
            <Separator />

            {/* Subnav */}
            {nav.subNav && subNavbar === nav.key && (
              <div className="subnav-dropdown-container">
                {nav.subNav.map((sub: SubNavLink) => (
                  <div key={sub.subKey} className="subnav-item">
                    <Link href={sub.subHref}>
                      <div className="ml-5 p-1 text-gray-300">
                        {sub.subLabel}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default NavbarDropdown;
