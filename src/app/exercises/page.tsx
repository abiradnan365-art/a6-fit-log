
import React from 'react';
import { Oswald } from 'next/font/google';

import { IFitness } from '@/type/fitness';
import ExerciseCard from '../components/ExerciseCard';

const oswald = Oswald({
    subsets: ['latin'],
});

const getExercises = async (): Promise<IFitness[]> => {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
    return res.json();
};

const ExercisePage = async () => {

    const exercises = await getExercises();

    return (
        <div className="min-h-screen mb-19  ">

            {/* Heading */}
            <div className="container mx-auto  px-4 pt-18 pb-10">
                <h1
                    className={`${oswald.className} text-4xl font-bold text-white`}
                >
                    THE LIBRARY
                </h1>

                <p className="mt-2 text-gray-400">
                    Twelve lifts covering every major muscle group.
                </p>
            </div>

            {/* Cards */}
            <div className="container mx-auto grid grid-cols-1 gap-6 px-4 pb-16 sm:grid-cols-2 lg:grid-cols-3">
                {exercises.map((exercise) => (
                    <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                    />
                ))}
            </div>

        </div>
    );
};

export default ExercisePage;