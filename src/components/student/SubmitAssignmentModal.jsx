import axios from 'axios';
import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { UserContext } from '../../store/userContext';

Modal.setAppElement('#root');


const MyModal = ({modalIsOpen, setModalIsOpen, id}) => {
  const {user} = useContext(UserContext);

  // modal 
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // post assignment 
  
  
  const [loading, setLoading] = useState(false);
  
  const [file, setFile] = useState(null);
  const [studentId, setStudentId] = useState(user?.student._id);
  const [assignmentId, setAssignmentId] = useState('65beb504d2a0315617eddbac');
  // const [assignmentId, setAssignmentId] = useState(id);

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

//   handle upload 
  const handleUpload = async () => {
    setLoading(true)
    console.log(file,"studId: ", studentId,"assId: ", assignmentId)
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('studentId', studentId);
      formData.append('assignmentId', assignmentId);

      const response = await axios.post(
        'https://assignment-grading-and-management-system.onrender.com/api/student/assignment',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
        if(response){
          setLoading(false)
          alert('Assignment Submitted Successfully!')
          console.log('File uploaded successfully:', response.data.URL);
          closeModal()
          window.location.reload();
        }
      } catch (error) {
        setLoading(false)
        alert('Error Submitting Assignment!')
        console.error('Error uploading file:', error.response ? error.response.data : error.message);
      }
  };

      const customStyles = {
        content: {
          maxWidth: '900px', // Set the desired width here
          margin: 'auto', // Center the modal horizontally
        },
      };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles} // Apply custom styles here
      >
        
        
      <div className=''>
        <div className='flex items-center justify-between mb-4'> 
          <h1>Submit Assignment</h1>
          <button onClick={closeModal}>Close Modal</button>
        </div>
        <div className='p-8 border-2 border-dotted rounded-lg'>
          <input type='file' onChange={handleFileChange} />
        </div>
        <button className='w-full bg-black text-white py-4 mt-4 rounded-md hover:bg-gray-800 cursor-pointer' onClick={handleUpload} disabled={!file}>
          {loading? 'Loading...' : 'Submit'}
        </button>
      </div>
      {loading && <h1 className='text-center text-3xl mt-20 animate-opacity'>Generating Automated Grades with ML model</h1>}

      </Modal>
    </div>
  );
};

export default MyModal;

