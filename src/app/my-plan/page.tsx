'use client'
import { ExercisesContext } from '@/context/ExercisesContext';
import React, { useContext, useState } from 'react';
import { Oswald } from "next/font/google";

import Link from 'next/link';
import Image from 'next/image';
import { FaCheck, FaClock, FaFire, FaStar } from "react-icons/fa";
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';


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
    setAddPlan: React.Dispatch<React.SetStateAction<ExerciseItem[]>>;
    setSaveList: React.Dispatch<React.SetStateAction<ExerciseItem[]>>;
}

type ExerciseTab = 'plan' | 'saved';



const oswald = Oswald({ subsets: ['latin'] });

const MyPlanPage = () => {

    const { addPlan, saveList, setAddPlan, setSaveList } = useContext(ExercisesContext) as ExerciseContextValue;

    const [shortBy, setShortBy] = useState<"Duration" | "Calories" | "Rating">("Duration")
    console.log(shortBy, "shortBy");

    const shortExercise = (exercises: ExerciseItem[]) => {
        const sortedExercises = [...exercises];

        if (shortBy === "Duration") {
            sortedExercises.sort(
                (a, b) => Number(b.duration ?? 0) - Number(a.duration ?? 0)
            );
        } else if (shortBy === "Calories") {
            sortedExercises.sort(
                (a, b) =>
                    Number(b.caloriesBurned ?? 0) -
                    Number(a.caloriesBurned ?? 0)
            );
        } else if (shortBy === "Rating") {
            sortedExercises.sort(
                (a, b) => Number(b.rating ?? 0) - Number(a.rating ?? 0)
            );
        }

        return sortedExercises;
    };

    const shortedAddPlans = shortExercise(addPlan);
    const shortedSaveList = shortExercise(saveList);

    const [completedIds, setCompletedIds] = useState<(string | number)[]>([]);

    const [activeTab, setActiveTab] = useState<ExerciseTab>('plan');

    const handleMarkAsDone = (id: string | number) => {

        if (completedIds.includes(id)) {
            return;
        }

        setCompletedIds((prev) => [...prev, id]);

        toast.success('Exercise marked as done!');
    };

    const handleRemove = (id: string | number) => {

        if (activeTab === 'plan') {
            setAddPlan((prev) =>
                prev.filter((exercise) => exercise.id !== id)
            );
        } else {
            setSaveList((prev) =>
                prev.filter((exercise) => exercise.id !== id)
            );
        }

        setCompletedIds((prev) =>
            prev.filter((completedId) => completedId !== id)
        );

        toast.error('Exercise removed!');
    };

    const totalMinutes: number = addPlan.reduce<number>((sum: number, exercise: ExerciseItem) => sum + (exercise.duration || 0), 0);
    const totalCalories: number = addPlan.reduce<number>((sum: number, exercise: ExerciseItem) => sum + (exercise.caloriesBurned || 0), 0);
    const totalMinutes2: number = saveList.reduce<number>((sum: number, exercise: ExerciseItem) => sum + (exercise.duration || 0), 0);
    const totalCalories2: number = saveList.reduce<number>((sum: number, exercise: ExerciseItem) => sum + (exercise.caloriesBurned || 0), 0);
    const activeExercises: ExerciseItem[] =
        activeTab === 'plan' ? shortedAddPlans : shortedSaveList;

    console.log(addPlan, "addPlan")
    console.log(saveList, "saveList");
    return (
        <div className='container mx-auto mb-28'>
            <h2 className={`${oswald.className} text-4xl font-bold mt-11`}>MY PLAN</h2>
            <p className='text-gray-500 mt-2'>Cap of five lifts for today. Finish them, then load more.</p>
            <div>
                {/* info */}
                <div className='grid grid-cols-3 border border-dashed border-gray-500 rounded-2xl mt-8 p-6 mb-9'>

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



                <div className='flex items-center gap-3 justify-end'>
                    <p className='text-gray-500'>Short by</p>
                    <select value={shortBy} onChange={(e) => setShortBy(e.target.value as "Duration" | "Calories" | "Rating")} className="select select-success">
                        <option disabled={true}>Short By</option>
                        <option value={"Duration"}>Duration</option>
                        <option value={"Calories"}>Calories</option>
                        <option value={"Rating"}>Rating</option>
                    </select>
                </div>

                {/* name of each tab group should be unique */}
                <div className="tabs tabs-lift ">

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
                                                src={exercise.image || ''}
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

                                                    <FaClock />
                                                    <span>
                                                        {exercise.duration ?? 0} min
                                                    </span>
                                                </div>

                                                {/* Calories */}
                                                <div className="flex items-center gap-1.5">
                                                    <FaFire />

                                                    <span>
                                                        {exercise.caloriesBurned ?? 0} kcal
                                                    </span>
                                                </div>

                                                {/* Rating */}
                                                <div className="flex items-center gap-1.5">
                                                    <FaStar />

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
                                                disabled={completedIds.includes(exercise.id)}
                                                onClick={() => handleMarkAsDone(exercise.id)}
                                                className={`flex items-center gap-1.5 text-sm px-6 py-2.5 rounded-full font-extrabold transition ${completedIds.includes(exercise.id)
                                                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                                                    : 'bg-lime-500 text-black hover:bg-lime-700'
                                                    }`}
                                            >
                                                <FaCheck />

                                                <span>
                                                    {completedIds.includes(exercise.id)
                                                        ? 'Completed'
                                                        : 'Mark as Done'}
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleRemove(exercise.id)}
                                                className="text-gray-400 hover:text-red-500 transition text-2xl"
                                                aria-label={`Remove ${exercise.name}`}
                                            >
                                                <RxCross2 />
                                            </button>
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
                                                src={exercise.image || ''}
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

                                                    <FaClock />
                                                    <span>
                                                        {exercise.duration ?? 0} min
                                                    </span>
                                                </div>

                                                {/* Calories */}
                                                <div className="flex items-center gap-1.5">
                                                    <FaFire />

                                                    <span>
                                                        {exercise.caloriesBurned ?? 0} kcal
                                                    </span>
                                                </div>

                                                {/* Rating */}
                                                <div className="flex items-center gap-1.5">
                                                    <FaStar />

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

                                            <button
                                                type="button"
                                                onClick={() => handleRemove(exercise.id)}
                                                className="text-gray-400 hover:text-red-500 transition text-2xl"
                                                aria-label={`Remove ${exercise.name}`}
                                            >
                                                <RxCross2 />
                                            </button>
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


    );
};

export default MyPlanPage;