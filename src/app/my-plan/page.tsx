'use client'
import { ExercisesContext } from '@/context/ExercisesContext';
import React, { useContext, useState } from 'react';
import { Oswald } from "next/font/google";
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { FaCheck, FaClock, FaFire, FaStar } from "react-icons/fa";
import { RxCross2 } from 'react-icons/rx';

interface ExerciseItem {
    id: string | number;
    name: string;
    duration?: number;
    caloriesBurned?: number;
    image?: string;
    equipment?: string;
    rating?: number;
}

interface ExerciseContextValue {
    addPlan: ExerciseItem[];
    saveList: ExerciseItem[];
}

type ExerciseTab = 'plan' | 'saved';

const oswald = Oswald({ subsets: ['latin'] });

const MyPlanPage = () => {



    const [activeTab, setActiveTab] = useState<ExerciseTab>('plan');

    const { addPlan, saveList } = useContext(ExercisesContext) as ExerciseContextValue;

    const totalMinutes: number = addPlan.reduce<number>((sum: number, exercise: ExerciseItem) => sum + (exercise.duration || 0), 0);
    const totalCalories: number = addPlan.reduce<number>((sum: number, exercise: ExerciseItem) => sum + (exercise.caloriesBurned || 0), 0);
    const totalMinutes2: number = saveList.reduce<number>((sum: number, exercise: ExerciseItem) => sum + (exercise.duration || 0), 0);
    const totalCalories2: number = saveList.reduce<number>((sum: number, exercise: ExerciseItem) => sum + (exercise.caloriesBurned || 0), 0);
    const activeExercises: ExerciseItem[] = activeTab === 'plan' ? addPlan : saveList;

    console.log(addPlan, "addPlan")
    console.log(saveList, "saveList");
    return (
        <div className='container mx-auto'>
            <h2 className={`${oswald.className} text-4xl font-bold mt-11`}>MY PLAN</h2>
            <p className='text-gray-500 mt-2'>Cap of five lifts for today. Finish them, then load more.</p>
            <div>
                <div className='grid grid-cols-3 border border-dashed border-blue-500 mt-8 p-6'>

                    <div>
                        <p className='text-gray-500'>Exercises</p>
                        <h2 className='text-3xl font-bold text-lime-400'>
                            {activeTab === 'plan' ? addPlan.length : saveList.length}
                        </h2>
                    </div>

                    <div>
                        <p className='text-gray-500'>Minutes</p>
                        <h2 className='text-3xl font-bold'>
                            {activeTab === 'plan' ? totalMinutes : totalMinutes2}
                        </h2>
                    </div>

                    <div>
                        <p className='text-gray-500'>Calories</p>
                        <h2 className='text-3xl font-bold'>
                            {activeTab === 'plan' ? totalCalories : totalCalories2}
                        </h2>
                    </div>

                </div>
                {/* name of each tab group should be unique */}
                <div className="tabs tabs-lift">
                    <input
                        type="radio"
                        name="my_tabs_3"
                        className="tab"
                        aria-label="Today's Plan"
                        checked={activeTab === 'plan'}
                        onChange={() => setActiveTab('plan')}
                    />
                    <div className="tab-content bg-base-100 border-base-300 p-6">
                        {
                            addPlan.length > 0 ?
                                (activeExercises.map((exercise, index) => (
                                   <div
                                        key={exercise.id}
                                        className="bg-black/95 text-gray-100 p-5 rounded-2xl flex items-center gap-6 shadow-xl border border-gray-800"
                                    >
                                        {/* Exercise Image */}
                                        <div className="w-24 h-24 overflow-hidden rounded-xl bg-gray-900 flex-shrink-0">
                                            <Image
                                                src={exercise.image}
                                                alt={exercise.name}
                                                width={96}
                                                height={96}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Exercise Details */}
                                        <div className="flex-1 space-y-2">
                                            <h2 className="text-xl font-extrabold uppercase tracking-tight text-white">
                                                {exercise.name}
                                            </h2>

                                            <p className="text-sm font-medium text-gray-400 capitalize">
                                                {exercise.equipment}
                                            </p>

                                            {/* Stats */}
                                            <div className="flex items-center gap-5 mt-2 text-sm text-gray-300">

                                                {/* Time */}
                                                <div className="flex items-center gap-1.5">
                                        
                                                    <FaClock/>
                                                    <span>
                                                        {exercise.duration ?? 0} min
                                                    </span>
                                                </div>

                                                {/* Calories */}
                                                <div className="flex items-center gap-1.5">
                                                    <FaFire/>

                                                    <span>
                                                        {exercise.caloriesBurned ?? 0} kcal
                                                    </span>
                                                </div>

                                                {/* Rating */}
                                                <div className="flex items-center gap-1.5">
                                                    <FaStar/>

                                                    <span className="font-medium text-white">
                                                        {exercise.rating?.toFixed(1) ?? 'N/A'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-3">

                                            {/* View Details */}
                                            <Link href={`/exercises/${exercise.id}`}
                                                type="button"
                                                className="inline-block text-sm px-6 py-2.5 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 transition font-medium"
                                            >
                                                View Details
                                            </Link>

                                            {/* Mark as Done */}
                                            <button
                                                type="button"
                                                className="flex items-center gap-1.5 text-sm px-6 py-2.5 rounded-full bg-[#CCEE22] text-black font-extrabold hover:bg-[#BBDD11] transition"
                                            >
                                                <FaCheck />

                                                <span>Mark as Done</span>
                                            </button>
                                            <RxCross2 />
                                        </div>
                                    </div>
                                ))) : (
                                    <div className='text-center py-10'>
                                        <h2 className={`${oswald.className} text-3xl`} >NOTHING HERE YET.</h2>
                                        <p className='text-gray-500'>Browse the library and add a lift to get today moving.</p>
                                        <Link href={'/'} className='inline-block bg bg-lime-500 px-4 py-3 rounded-2xl mt-6 text-black' >Go to workouts</Link>
                                    </div>


                                )
                        }
                    </div>

                    <input
                        type="radio"
                        name="my_tabs_3"
                        className="tab"
                        aria-label="Saved"
                        checked={activeTab === 'saved'}
                        onChange={() => setActiveTab('saved')}
                    />
                    <div className="tab-content bg-base-100 border-base-300 p-6">
                        {
                            saveList.length > 0 ?

                                (activeExercises.map((exercise) => (
                                     <div
                                        key={exercise.id}
                                        className="bg-black/95 text-gray-100 p-5 rounded-2xl flex items-center gap-6 shadow-xl border border-gray-800"
                                    >
                                        {/* Exercise Image */}
                                        <div className="w-24 h-24 overflow-hidden rounded-xl bg-gray-900 flex-shrink-0">
                                            <Image
                                                src={exercise.image}
                                                alt={exercise.name}
                                                width={96}
                                                height={96}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Exercise Details */}
                                        <div className="flex-1 space-y-2">
                                            <h2 className="text-xl font-extrabold uppercase tracking-tight text-white">
                                                {exercise.name}
                                            </h2>

                                            <p className="text-sm font-medium text-gray-400 capitalize">
                                                {exercise.equipment}
                                            </p>

                                            {/* Stats */}
                                            <div className="flex items-center gap-5 mt-2 text-sm text-gray-300">

                                                {/* Time */}
                                                <div className="flex items-center gap-1.5">
                                        
                                                    <FaClock/>
                                                    <span>
                                                        {exercise.duration ?? 0} min
                                                    </span>
                                                </div>

                                                {/* Calories */}
                                                <div className="flex items-center gap-1.5">
                                                    <FaFire/>

                                                    <span>
                                                        {exercise.caloriesBurned ?? 0} kcal
                                                    </span>
                                                </div>

                                                {/* Rating */}
                                                <div className="flex items-center gap-1.5">
                                                    <FaStar/>

                                                    <span className="font-medium text-white">
                                                        {exercise.rating?.toFixed(1) ?? 'N/A'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-3">

                                            {/* View Details */}
                                            <Link href={`/exercises/${exercise.id}`}
                                                type="button"
                                                className="inline-block text-sm px-6 py-2.5 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 transition font-medium"
                                            >
                                                View Details
                                            </Link>

                                            <RxCross2 />
                                        </div>
                                    </div>
                                )))
                                : (
                                    <div className='text-center py-10'>
                                        <h2 className={`${oswald.className} text-3xl`} >NOTHING HERE YET.</h2>
                                        <p className='text-gray-500'>Browse the library and add a lift to get today moving.</p>
                                        <Link href={'/'} className='inline-block bg bg-lime-500 px-4 py-3 rounded-2xl mt-6 text-black' >Go to workouts</Link>
                                    </div>
                                )
                        }
                    </div>

                </div>



            </div>
        </div>
        // </div>
    );
};

export default MyPlanPage;