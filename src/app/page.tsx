import React from 'react';
import Hero from './components/Hero';


import ExercisePage from './exercises/page';
import MyPlanPage from './my-plan/page';


const page = () => {
  return (
    <div>
      <Hero></Hero>
      <ExercisePage></ExercisePage>
      <MyPlanPage></MyPlanPage>
     
    </div>
  );
};

export default page;