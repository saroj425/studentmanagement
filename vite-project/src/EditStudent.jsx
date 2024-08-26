import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';

const EditStudent = () => {
  const { id } = useParams();
  const [studentData, setStudentData] = useState({
    name: '',
    className: '',
    address: '',
    rollNumber: '',
    gender: '',
    batchYear: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the student details to populate the form
    axios.get(`http://localhost:5000/students/${id}`)
      .then(response => {
        const student = response.data;
        setStudentData({
          name: student.name,
          className: student.class,
          address: student.address,
          rollNumber: student.rollNumber,
          gender: student.gender,
          batchYear: student.batchYear
        });
      })
      .catch(error => console.error('Error fetching student:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/students/${id}`, studentData)
      .then(() => navigate('/'))
      .catch(error => console.error('Error updating student:', error));
  };

  return (
    <div className="dashboard-container">
        <Sidebar/>
        <div className='main-content'>
          <div className="edit-student-container">
            <h1>Edit Student</h1>
            <form className="edit-student-form" onSubmit={handleSubmit}>
              <label>
                <span>Name:</span>
                <input type="text" name="name" value={studentData.name} onChange={handleChange} required />
              </label>
              <label>
                <span>Class:</span>
                <input type="text" name="className" value={studentData.className} onChange={handleChange} required />
              </label>
              <label>
                <span>Address:</span>
                <input type="text" name="address" value={studentData.address} onChange={handleChange} required />
              </label>
              <label>
                <span>Roll Number:</span>
                <input type="text" name="rollNumber" value={studentData.rollNumber} onChange={handleChange} required />
              </label>
              <label>
                <span>Gender:</span>
                <select name="gender" value={studentData.gender} onChange={handleChange} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label>
                <span>Batch Year:</span>
                <input type="number" name="batchYear" value={studentData.batchYear} onChange={handleChange} required />
              </label>
              <button type="submit">Update Student</button>
            </form>
          </div>
        </div>
      </div>
    
  );
};

export default EditStudent;
