import React from 'react';
import Hero from './components/Hero';

import { IFitness } from '@/type/fitness';
import ExercisePage from './exercises/page';

const page = () => {
  return (
    <div>
      <Hero></Hero>
      <ExercisePage></ExercisePage>
    </div>
  );
};

export default page;