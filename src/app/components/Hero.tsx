
import React from 'react';
import Image from 'next/image';
import banner from '@/assets/banner.png';
import { Oswald } from 'next/font/google';
const oswald = Oswald({ subsets: ['latin'] });
const Hero = () => {
    return (
        <div className="hero bg-base-200  py-14 rounded-2xl container mx-auto my-10">
            <div className="hero-content flex-col gap-60 lg:flex-row-reverse">
                <Image
                    src={banner}
                    alt="Banner"

                    width={400}
                    height={400}
                    className="max-w-sm rounded-lg "
                />
                <div>
                    <p className="text-[#C2F800] text-sm pb-6 ">WORKOUT LIBRARY</p>
                    <h1 className={`text-5xl font-bold ${oswald.className} text-white`}>TRAIN WITH INTENT. LOG <br />
                        EVERY SET.</h1>
                    <p className="py-6 text-gray-400">
                        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it <br />
                        into today's plan, and watch the week's work add up.
                    </p>
                    <button className="btn bg-lime-400  text-black">BROWSE WORKOUTS</button>
                </div>
            </div>
        </div>
    );
};

export default Hero;