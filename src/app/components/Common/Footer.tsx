"use client";
import Link from 'next/link';
import React, { JSX, useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import ThemeSwitcher from './ThemeSwitcher';

type Link = {
  name: string;
  href: string;
};

type SocialLink = {
  name: string;
  href: string;
  icon: JSX.Element;
};

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  const quickLinks: Link[] = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/product' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const socialLinks: SocialLink[] = [
    { name: 'Facebook', href: 'https://facebook.com', icon: <FaFacebook /> },
    { name: 'Twitter', href: 'https://twitter.com', icon: <FaTwitter /> },
    { name: 'Instagram', href: 'https://instagram.com', icon: <FaInstagram /> },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: <FaLinkedin /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="container md:pt-10 border-t border-t-bordercolor">
      <div className="md:grid grid-cols-12 gap-6 xs:pb-14 md:space-y-0 space-y-14 " >
        {/* Logo */}
        <div className='lg:col-span-4 xs:col-span-6 col-span-12 ' data-aos="fade-right">
          <Link href='/' className='uppercase font-medium text-3xl dark:text-light'>
            Kaira
          </Link>
          <p className='text-[#777] mt-5 sm:text-lg text-base'>Gravida massa volutpat aenean odio. Amet, turpis erat nullam fringilla elementum diam in. Nisi, purus vitae, ultrices nunc. Sit ac sit suscipit hendrerit.</p>
          <div className="flex space-x-6 mt-5">
            {socialLinks.map((social) => (
              <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer">
                <span className="text-2xl text-[#777] hover:text-dark duration-300 dark:hover:text-gray-light">{social.icon}</span>
              </a>
            ))}
          </div>
        </div>
        {/* Quick Links */}
        <div className='lg:col-span-5 sm:col-span-6 col-span-12 sm:flex md:justify-around justify-between' data-aos="zoom-in">
          <div className=''>
            <h4 className='mb-6 text-2xl dark:text-light'>Quick Links</h4>
            <div className="space-y-4 mb-4 flex flex-col font-body ">
              {quickLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-[#777] hover:text-dark dark:hover:text-gray-light duration-300">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className='sm:mt-0 mt-10'>
            <h4 className='mb-6 text-2xl dark:text-light'>Quick Links</h4>
            <div className="space-y-4 mb-4 flex flex-col font-body ">
              {quickLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-[#777] hover:text-dark duration-300 dark:hover:text-gray-light">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className='lg:col-span-3 xs:col-span-6 col-span-12 lg:pt-0 md:pt-10 ' data-aos="fade-left">
          <h4 className='mb-6 text-2xl dark:text-light'>Contact Us</h4>
          <p className='text-[#777] mb-5 text-base dark:text-gray-light'>
            Do you have any questions or suggestions? <a href="mailto:info@ecommerce.com" className="text-dark block text-lg dark:text-[#777]">info@ecommerce.com</a>
          </p>
          <p className='text-[#777] mb-5 text-base dark:text-gray-light'>
            Do you need support? Give us a call. <a href="tel:+43 720 11 52 78" className="text-dark block text-lg dark:text-[#777]">+43 720 11 52 78</a>
          </p>
        </div>

      </div>
        <ThemeSwitcher/>
      <div className="text-center my-10 text-base border-t border-t-bordercolor relative">
        <p className="text-[#777] pt-10">&copy; 2025 E-Commerce Store. All rights reserved.</p>
      </div>

      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          title='scroll To Top - Button'
          onClick={scrollToTop}
          className="fixed bottom-5 sm:bottom-1/2 right-5 px-2 rounded-full bg-white/50 shadow-lg border-dark border transition-all duration-300 text-default"
        >
          <span className='animate-moveFromTop text-5xl text-dark'>.</span>
        </button>
      )}


    </footer>
  );
}

export default Footer;
