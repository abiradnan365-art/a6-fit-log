'use client'
import { ExercisesContext } from '@/context/ExercisesContext';
import { IFitness } from '@/type/fitness';
import React, { ReactElement, useContext } from 'react';
import { IoAddCircleSharp } from 'react-icons/io5';
import { toast } from 'react-toastify';

interface AddPlanButtonProps {
    exercise: IFitness;
    
}

const AddPlanButton = ({ exercise }: AddPlanButtonProps): ReactElement => {
    const {addPlan, setAddPlan } = useContext(ExercisesContext) as {
        addPlan: IFitness[];
        setAddPlan: React.Dispatch<React.SetStateAction<IFitness[]>>;
        
    };

    const handleAddExercise = () => {
        console.log('exercise btn clickd', exercise);

        setAddPlan((prevAddPlan: IFitness[]) => [...prevAddPlan, exercise]);
        toast.success(`You have added ${exercise.name}`)
    };

    return (
        <button className="btn border-none bg-[#C2F800] px-5 text-xs font-bold text-black hover:bg-[#d4ff35]" onClick={() => handleAddExercise()}>
            <IoAddCircleSharp />
            Add to today's plan
        </button>
    );
};

export default AddPlanButton;