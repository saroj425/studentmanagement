import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Components/Sidebar/Sidebar';

const AddStudent = () => {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [address, setAddress] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [gender, setGender] = useState('');
  const [batchYear, setBatchYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/students', { name, class: className, address, rollNumber, gender, batchYear })
      .then(() => {
        alert("Student added successfully!");
        setName('');
        setClassName('');
        setAddress('');
        setRollNumber('');
        setGender('');
        setBatchYear('');
       
      })
      .catch(error => {
        console.error("There was an error adding the student:", error);
      });
  };

  return (
    <div className="dashboard-container">
        <Sidebar/>
        <div className='main-content'>
          <div className="add-student-container">
          <h1>Add Student</h1>
          <form className="add-student-form" onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              Class:
              <input type="text" value={className} onChange={(e) => setClassName(e.target.value)} required />
            </label>
            <label>
              Address:
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </label>
            <label>
              Roll Number:
              <input type="text" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} required />
            </label>
            <label>
              Gender:
              <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Batch Year:
              <input type="number" value={batchYear} onChange={(e) => setBatchYear(e.target.value)} required />
            </label>
            <button type="submit">Add Student</button>
          </form>
        </div>
        </div>
    </div>
  );
};

export default AddStudent;
