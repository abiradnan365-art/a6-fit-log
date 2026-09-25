
import Image from "next/image";
import Link from "next/link";
import { IFitness } from "@/type/fitness";
import { Oswald } from "next/font/google";
import { FaClock, FaFire, FaStar } from "react-icons/fa";

const oswald = Oswald({ subsets: ['latin'] });

const ExerciseCard = ({ exercise }: { exercise: IFitness }) => {
    return (
        <Link  href={`/exercises/${exercise.id}`}>
            <div className="group overflow-hidden rounded-xl border border-gray-500 bg-gray-900 transition-all duration-300 hover:-translate-y-1 hover:border-[#C2F800]">

               
                <div className="relative h-56 w-full overflow-hidden">
                    <Image
                        src={exercise.image}
                        alt={exercise.name}
                        width={400}
                        height={400}
                       
                        className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    
                    <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase text-white ">
                        {exercise.difficulty}
                    </span>
                </div>

                
                <div className="p-5">

                    
                    <div className="mb-3 flex flex-wrap gap-2">
                        {exercise.muscleGroups.map((muscle) => (
                            <span
                                key={muscle}
                                className="rounded-full bg-[#C2F800] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-black"
                            >
                                {muscle}
                            </span>
                        ))}
                    </div>

                    
                    <h2 className={`${oswald.className} mb-2 text-xl font-bold uppercase text-white`}>
                        {exercise.name}
                    </h2>

                    <p className="mb-5 text-sm text-gray-400">
                         {exercise.equipment}
                    </p>

                    
                    <div className="flex items-center justify-between border-t border-[#292d31] pt-4 text-xs text-gray-400">

                        <div className="flex items-center gap-1">
                            <FaClock />
                           
                            <span>{exercise.duration} min</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <FaFire />
                        
                            <span>{exercise.caloriesBurned} kcal</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <FaStar />
                            <span>{exercise.rating}</span>
                        </div>

                    </div>

                </div>
            </div>
        </Link>
    );
};

export default ExerciseCard;