import React, { ReactNode } from 'react';
export interface StatsData{
    title: string;
    stats: number;
    icon: ReactNode;
    name?: string;
}
interface Stats{
    stats: StatsData[];
}
const StatsCard:React.FC<Stats> = ({stats}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {stats.map((curr: StatsData)=>(
            <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-6 flex items-center justify-between">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{curr.stats}</h3>
              <p className="text-gray-500 dark:text-gray-400">{curr.title}</p>
            </div>
            {curr.icon}
          </div>
        ))}
    

   
  </div>
  )
}

export default StatsCard
