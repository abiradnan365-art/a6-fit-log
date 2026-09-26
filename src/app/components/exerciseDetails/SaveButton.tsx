'use client'
import { ExercisesContext } from '@/context/ExercisesContext';
import { IFitness } from '@/type/fitness';
import React, { ReactElement, useContext } from 'react';
import { MdOutlineBookmarkAdd } from 'react-icons/md';
import { toast } from 'react-toastify';

interface SavedButtonProps {
    exercise: IFitness;
}

const SaveButton = ({ exercise }: SavedButtonProps): ReactElement => {
    const {saveList, setSaveList} = useContext(ExercisesContext) as {
        saveList: IFitness[];
        setSaveList: React.Dispatch<React.SetStateAction<IFitness[]>>;
    };

    const handleAddExercise = () => {
        console.log('saved  btn clickd', exercise);

        setSaveList((prevSaveList: IFitness[]) => [...prevSaveList, exercise]);
        toast.success(`You have saved ${exercise.name}`)
    };
    return (
        <button className="btn border border-[#3a3e42] bg-transparent px-5 text-xs font-medium text-gray-300 hover:border-[#C2F800] hover:bg-transparent hover:text-white" onClick={() => handleAddExercise()}>
            <MdOutlineBookmarkAdd />
            Save for later
        </button>
    );
};

export default SaveButton;