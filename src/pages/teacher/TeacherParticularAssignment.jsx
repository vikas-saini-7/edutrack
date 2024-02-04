import React, { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import TeacherSidebarLayout from '../../layout/teacher/TeacherSidebarLayout';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TeacherParticularAssignment = () => {
  
  const {id} = useParams();
  
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // loading assignment by fetch
  useEffect(() => {
    async function fetchAssignment() {
      try {
        const response = await axios.get(`https://assignment-grading-and-management-system.onrender.com/api/teacher/assignment/${id}`);
        setAssignment(response.data.assignment);
        console.log('api 2:', response.data)
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    fetchAssignment();

    return () => {};
  }, []);

  return (
    <MainLayout>
      <TeacherSidebarLayout />
      <div className='bg-[#d6d6d6] w-full h-screen p-4'>
        <div className=' w-full h-full rounded-md  overflow-y-scroll hideScrollbar flex flex-col-reverse'>
          <section
            className='flex flex-1 justify-between text-white rounded-lg p-4 gap-4 mb-4 items-center'
            style={{
              background:
                'radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)',
            }}
          >
            <div className='w-full h-fit p-4  rounded-xl flex lg:flex-row flex-col gap-1 lg:gap-3'>
              <div className='w-full lg:w-1/2 h-auto  flex flex-row justify-between items-center'>

                <div className='flex flex-col gap-3 w-full'>
                  <div className='flex flex-row w-full'>
                    <p className='w-[40%] p-1 text-sm sm:text-base font-medium sm:p-2 rounded-md'>
                      Title :
                    </p>
                    <p className='w-[60%] p-1 text-sm sm:text-base sm:p-2 rounded-md bg-[#ffffff2c] text-white shadow-sm shadow-white'>
                      {assignment?.title}
                    </p>
                  </div>
                  <div className='flex flex-row w-full'>
                    <p className='w-[40%] p-1 text-sm sm:text-base font-medium sm:p-2 rounded-md'>
                      Posted By :
                    </p>
                    <p className='w-[60%] p-1 text-sm sm:text-base sm:p-2 rounded-md bg-[#ffffff2c] text-white shadow-sm shadow-white'>
                      Vikas Saini
                    </p>
                  </div>
                  <div className='flex flex-row w-full'>
                    <p className='w-[40%] p-1 text-sm sm:text-base font-medium sm:p-2 rounded-md'>
                      Publish Date :
                    </p>
                    <p className='w-[60%] p-1 text-sm sm:text-base sm:p-2 rounded-md bg-[#ffffff2c] text-white shadow-sm shadow-white'>
                    {assignment?.startDate ? new Date(assignment.startDate).toLocaleDateString() : 'N/A'}

                    </p>
                  </div>
                </div>
              </div>
              <div className='w-full lg:w-1/2 h-auto flex justify-center'>
                <div className='w-40 h-40 rounded-xl bg-white text-black flex justify-center items-center'>
                  <a target='_blank' href={assignment?.file}>Assignment File</a>
                </div>
              </div>
            </div>
          </section>

          
        </div>
      </div>
    </MainLayout>
  );
};

export default TeacherParticularAssignment;
