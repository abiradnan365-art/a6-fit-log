'use client'
import { ExercisesContext } from '@/context/ExercisesContext';
import React, { useContext, useState } from 'react';
import { Oswald } from "next/font/google";

interface ExerciseItem {
    id: string | number;
    name: string;
    duration?: number;
    caloriesBurned?: number;
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
                                className='border p-5 rounded-lg'
                            >
                                <p className='text-gray-500'>
                                    Exercise {index + 1}
                                </p>

                                <h2 className='text-xl font-bold'>
                                    {exercise.name}
                                </h2>

                                <div className='flex gap-6 mt-2 text-gray-500'>
                                    <p>{exercise.duration} minutes</p>
                                    <p>{exercise.caloriesBurned} calories</p>
                                </div>
                            </div>
                        ))): (
                            <p>No exercises in today's plan.</p>
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
                        (activeExercises.map((exercise, index) => (
                            <div
                                key={exercise.id}
                                className='border p-5 rounded-lg'
                            >
                                <p className='text-gray-500'>
                                    Exercise {index + 1}
                                </p>

                                <h2 className='text-xl font-bold'>
                                    {exercise.name}
                                </h2>

                                <div className='flex gap-6 mt-2 text-gray-500'>
                                    <p>{exercise.duration} minutes</p>
                                    <p>{exercise.caloriesBurned} calories</p>
                                </div>
                            </div>
                        ))): (
                            <p>No exercises in save list.</p>
                        )
                        }
                    </div>

                </div>

                {/* <div className='mt-8 space-y-4'>

                    {activeTab.map((exercise, index) => (
                        <div
                            key={exercise.id}
                            className='border p-5 rounded-lg'
                        >
                            <p className='text-gray-500'>
                                Exercise {index + 1}
                            </p>

                            <h2 className='text-xl font-bold'>
                                {exercise.name}
                            </h2>

                            <div className='flex gap-6 mt-2 text-gray-500'>
                                <p>{exercise.duration} minutes</p>
                                <p>{exercise.caloriesBurned} calories</p>
                            </div>
                        </div>
                    ))} */}

                </div>
            </div>
        // </div>
    );
};

export default MyPlanPage;