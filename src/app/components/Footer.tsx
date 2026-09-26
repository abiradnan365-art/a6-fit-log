import Image from 'next/image';
import React from 'react';
import logo from '@/assets/logo.png'
import { Oswald } from 'next/font/google';
const oswald = Oswald({ subsets: ['latin'] });
const Footer = () => {
    return (
        <div className='bg-black mt- p-15 '>
            <div className='container mx-auto flex justify-between'>
                <div className='flex flex-row gap-3'>
                    <Image 
                    src={logo}
                    alt='logo'
                    width={32}
                    height={32}
                    />
                    <h3 className={`${oswald.className} text-2xl`}>FITLOG</h3>
                </div>
                <p className='text-gray-500  text-sm'>© 2026 FitLog — Workout Library. Train hard, log honest.</p>

            </div>
        </div>
    );
};

export default Footer;