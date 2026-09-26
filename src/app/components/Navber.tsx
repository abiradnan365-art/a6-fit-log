'use client'
import React, { useContext } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import logo from '@/assets/logo.png'
import { Oswald } from 'next/font/google';
import { ExercisesContext } from '@/context/ExercisesContext';
const oswald = Oswald({ subsets: ['latin'] });

const Navber = () => {
    const { addPlan = [], saveList = [] } = useContext(ExercisesContext) as {
        addPlan: unknown[];
        saveList: unknown[];
    };
    const pathname = usePathname();
    const links = <>
        <li><Link className={pathname === '/' ? 'text-lime-500' : ''} href='/'>Workouts</Link></li>
        <li> <Link className={pathname === '/my-plan' ? 'text-lime-500' : ''} href='/my-plan'>My Plan</Link></li>

    </>

    return (
        <nav className='sticky top-0 z-50 w-full bg-black '>

            <div className="navbar container mx-auto  ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}

                        </ul>
                    </div>
                    <Image
                        src={logo}
                        alt=''
                        width={32}
                        height={32}
                    />
                    <a className={`btn btn-ghost text-xl ${oswald.className}`}>FITLOG</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end flex items-center gap-4">
                    <Link href="/my-plan">
                        <div>
                            <span>Plan</span>
                            <span className="badge bg-lime-500 text-black ml-1">
                                {addPlan.length}
                            </span>
                        </div>
                    </Link>

                    <Link href="/my-plan">
                        <div>
                            <span>Saved</span>
                            <span className="badge badge-outline ml-1">
                                {saveList.length}
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
            <hr className='text-gray-800' />
        </nav>

    );
};

export default Navber;