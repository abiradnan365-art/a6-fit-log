import { IFitness } from '@/type/fitness';
import Image from 'next/image';
import React from 'react';
import { FaClock, FaFire, FaStar } from "react-icons/fa";
import { Oswald } from 'next/font/google';


import AddPlanButton from '@/app/components/exerciseDetails/AddPlanButton';
import SaveButton from '@/app/components/exerciseDetails/SaveButton';
const oswald = Oswald({
    subsets: ['latin'],
});

interface IExerciseDetailsPageProps {
    params: Promise<{
        Id: string;
    }>
}

const getExercises = async (): Promise<IFitness[]> => {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
    return res.json();
};

const ExerciseDetailsPage = async ({ params }: IExerciseDetailsPageProps) => {
    const { Id } = await params;
    // console.log(Id, "id")
    const exercisesData = await getExercises();
    const exercise = exercisesData.find(
        (exercise: IFitness) => String(exercise.id) === String(Id)
    );
    console.log(exercise)

    if (!exercise) {
        return <div>Exercise not found</div>;
    }

    return (
         <div className="min-h-screen bg-black px-4 py-10">
            <div className="container mx-auto">

               
                <div className="grid overflow-hidden rounded-2xl border border-gray-800 bg-black/70 shadow-2xl lg:grid-cols-2">

                  
                    <div className="relative min-h-[400px] lg:min-h-[650px]">
                        <Image
                            src={exercise.image}
                            alt={exercise.name}
                            fill
                            className="object-cover"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        
                        <div className="absolute left-5 top-5">
                            <span className="rounded-full bg-black/70 px-4 py-2 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                                {exercise.difficulty}
                            </span>
                        </div>
                    </div>

                    
                    <div className="p-6 sm:p-8 lg:p-10">

                        
                        <h1 className={`${oswald} text-3xl font-black uppercase tracking-tight text-white sm:text-4xl`}>
                            {exercise.name}
                        </h1>

                        
                        <p className="mt-3 text-sm leading-6 text-gray-400">
                            {exercise.description}
                        </p>

                        
                        <div className="mt-5 flex flex-wrap gap-2">
                            {(exercise.muscleGroups ?? []).map((muscle) => (
                                <span
                                    key={muscle}
                                    className="rounded-full bg-[#C2F800] px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-black"
                                >
                                    {muscle}
                                </span>
                            ))}
                        </div>

                       
                        <div className="mt-6 overflow-hidden rounded-xl border border-[#292d31] bg-[#151719]">

                           
                            <div className="flex items-center justify-between border-b border-[#292d31] px-4 py-4">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                    Equipment
                                </span>

                                <span className="text-xs text-gray-200">
                                    {exercise.equipment}
                                </span>
                            </div>

                            
                            <div className="flex items-center justify-between border-b border-[#292d31] px-4 py-4">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                    Difficulty
                                </span>

                                <span className="text-xs text-gray-200">
                                    {exercise.difficulty}
                                </span>
                            </div>

                            
                            <div className="flex items-center justify-between border-b border-[#292d31] px-4 py-4">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                    Sets
                                </span>

                                <span className="text-xs text-gray-200">
                                    {exercise.sets}
                                </span>

                            </div>

                            
                            <div className="flex items-center justify-between border-b border-[#292d31] px-4 py-4">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                    Reps
                                </span>

                                <span className="text-xs text-gray-200">
                                    {exercise.reps}
                                </span>
                            </div>

                            
                            <div className="flex items-center justify-between border-b border-[#292d31] px-4 py-4">
                                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                    <FaClock />
                                    Duration
                                </span>

                                <span className="text-xs text-gray-200">
                                    {exercise.duration} min
                                </span>
                            </div>

                            
                            <div className="flex items-center justify-between border-b border-[#292d31] px-4 py-4">
                                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                    <FaFire />
                                    Calories
                                </span>

                                <span className="text-xs text-gray-200">
                                    {exercise.caloriesBurned} kcal
                                </span>
                            </div>

                            
                            <div className="flex items-center justify-between px-4 py-4">
                                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                    <FaStar />
                                    Rating
                                </span>

                                <span className="text-xs text-gray-200">
                                    {exercise.rating}
                                </span>
                            </div>

                        </div>

                        
                        <div className="mt-7">
                            <h2 className="text-sm font-black uppercase tracking-wider text-white">
                                Instructions
                            </h2>

                            <div className="mt-4 space-y-3">
                                {(exercise.instructions ?? []).map(
                                    (instruction, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-3 text-xs leading-5 text-gray-400"
                                        >
                                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1b1e20] text-[9px] font-bold ">
                                                {index + 1}
                                            </span>

                                            <p>{instruction}</p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        
                        <div className="mt-7 flex flex-wrap gap-3">

                           <AddPlanButton exercise={exercise} />

                           <SaveButton exercise={exercise}></SaveButton>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    
    );
};

export default ExerciseDetailsPage