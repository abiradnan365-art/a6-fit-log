'use client'
import React, { createContext, useState, type ReactNode } from 'react';



export const ExercisesContext = createContext({});

const ExercisesProvider = ({ children }: {children : ReactNode}) => {
    const [addPlan, setAddPlan] = useState([]);
    const [saveList, setSaveList] = useState([]);

    const sharedData = {
        addPlan,
        setAddPlan,
        saveList,
        setSaveList
    };

    return (
        <ExercisesContext.Provider value={sharedData}>{children}</ExercisesContext.Provider>
    );
};

export default ExercisesProvider;