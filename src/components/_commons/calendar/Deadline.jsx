import React, { useState } from 'react';

function Deadline({ selectedDate, Assignments }) {
  const today = new Date();
  const pickedDate = selectedDate instanceof Date ? selectedDate.toLocaleDateString() : today.toLocaleDateString();

  const [inputDateString, setInputDateString] = useState('2/3/2024');
  const inputDate = new Date(inputDateString);

  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedInputDate = inputDate.toLocaleDateString('en-US', options);

  return (
    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll '>
      {Assignments?.map((item, i) => {
        const assignmentDate = new Date(item.date);
        const formattedAssignmentDate = assignmentDate.toLocaleDateString('en-US', options);

        return item.date === pickedDate ? (
          <div key={i} className='p-3 flex flex-col gap-3 border-b border-gray-200 '>
            <a target='_blank' href={item.title} className='text-black animate-pulse'>
              Assignment 1
            </a>
            <p className='flex flex-row justify-between'>
              <span>Time_of_Post</span> <span>{formattedAssignmentDate}</span>
            </p>
          </div>
        ) : null;
      })}
      {Assignments.every((item) => item.date !== pickedDate) && (
        <p className='text-center text-gray-500'>No Assignments Found</p>
      )}
    </div>
  );
}

export default Deadline;
