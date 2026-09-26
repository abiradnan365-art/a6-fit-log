import React from 'react';

const loading = () => {
    return (
        <div className="min-h-[400px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <span className="loading loading-spinner loading-lg text-lime-400"></span>

                <p className="text-gray-400 text-lg">
                    Loading workouts…
                </p>
            </div>
        </div>
    );
};

export default loading;