"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { navigation } from "@/constants/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Route/Sayfa değiştiğinde mobil menüyü otomatik olarak kapat
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const toggleMenu = () => {
    if (isOpen) {
      setActiveDropdown(null);
    }
    setIsOpen(!isOpen);
  };

  const handleDropdownToggle = (title: string) => {
    if (activeDropdown === title) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(title);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2 sm:gap-3">
                <Image src="/images/logo.png" alt="Asmalı Derneği Logo" width={120} height={48} className="h-10 sm:h-12 w-auto object-contain shrink-0" priority unoptimized={true} />
                <div className="flex flex-col">
                  <span className="font-bold text-[11px] sm:text-[13px] xl:text-[15px] leading-tight sm:leading-snug text-(--color-primary) tracking-tight">Marmara Adası Asmalı Köyü</span>
                  <span className="font-bold text-[11px] sm:text-[13px] xl:text-[15px] leading-tight sm:leading-snug text-(--color-primary) tracking-tight">Kültür ve Dayanışma Derneği</span>
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden xl:flex items-center space-x-4">
              {navigation.map((item) => (
                <div
                  key={item.title}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-(--color-dark) hover:text-(--color-primary) transition-colors"
                  >
                    {item.title}
                    {item.dropdown && <ChevronDown size={16} />}
                  </Link>

                  {/* Dropdown Desktop */}
                  {item.dropdown && activeDropdown === item.title && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-52 z-50 animate-dropdown">
                      <div className="relative bg-white rounded-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] border border-gray-100 p-1.5">
                        {/* Üst Ok */}
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-gray-100 rotate-45" />

                        <div className="relative z-10 flex flex-col bg-white">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className="group relative flex items-center px-3 py-2.5 text-[14px] font-medium text-gray-600 rounded-lg hover:text-(--color-primary) hover:bg-gray-50/80 transition-colors duration-200 overflow-hidden"
                            >
                              <span className="relative z-10">{subItem.title}</span>
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 bg-(--color-primary) rounded-r-full transition-all duration-300 opacity-0 group-hover:h-[60%] group-hover:opacity-100" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex xl:hidden items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-(--color-dark) hover:text-(--color-primary) focus:outline-none"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="xl:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <div key={item.title}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => handleDropdownToggle(item.title)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-(--color-dark) hover:bg-gray-50"
                      >
                        {item.title}
                        <ChevronDown size={20} className={`transform transition-transform ${activeDropdown === item.title ? 'rotate-180' : ''}`} />
                      </button>
                      {activeDropdown === item.title && (
                        <div className="pl-4 pr-2 py-2 space-y-1 mt-1 bg-gray-50/50 rounded-xl border-l-2 border-(--color-primary)/20 ml-2">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-white hover:text-(--color-primary) hover:shadow-sm transition-all"
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-(--color-dark) hover:bg-gray-50 hover:text-(--color-primary)"
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] xl:hidden"
          onClick={() => {
            setIsOpen(false);
            setActiveDropdown(null);
          }}
        />
      )}
    </>
  );
}
