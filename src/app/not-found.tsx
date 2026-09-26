import Link from 'next/link';
import React from 'react';

const notFound = () => {
    return (
        <div className='min-h-[70vh] flex items-center justify-center px-6'>
            <div className='text-center'>
                <p className='text-lime-400 font-semibold  mb-3'>
                    FITLOG
                </p>
                <h1 className='text-7xl md: text-9xl font-bold text-white'>
                    404
                </h1>
                <h2 className='text-2xl md:text-3xl font-bold text-white mt-4'>
                    WORKOUT NOT FOUND
                </h2>
                <p className='text-gray-400 mt-3'>
                    The page {`you're`} looking for{` doesn't `}exist.
                </p>
                <Link href="/"
                className="inline-block mt-6 bg-lime-400 text-black font-bold px-6 py-3 rounded-2xl ">
                Back To Workouts
                </Link>
            </div>
        </div>
    );
};

export default notFound;