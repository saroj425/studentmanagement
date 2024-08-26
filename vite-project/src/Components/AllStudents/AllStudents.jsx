import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

const AllStudents = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [studentsByGender, setStudentsByGender] = useState([]);
  const [studentsByBatchYear, setStudentsByBatchYear] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchRollNumber, setSearchRollNumber] = useState('');
  const [searchedStudent, setSearchedStudent] = useState(null);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/students/${id}`)
      .then(() => {
        setStudents(students.filter(student => student._id !== id));
        setSearchedStudent(null);
      })
      .catch(error => console.error('Error deleting student:', error));
  };

  const handleSearch = () => {
    axios.get(`http://localhost:5000/students?rollNumber=${searchRollNumber}`)
      .then(response => setSearchedStudent(response.data))
      .catch(error => console.error('Error searching student:', error));
  };

  useEffect(() => {
    axios.get('http://localhost:5000/students/statistics')
      .then(response => {
        setTotalStudents(response.data.totalStudents || 0);
        setStudentsByGender(response.data.studentsByGender || []);
        setStudentsByBatchYear(response.data.studentsByBatchYear || []);
      })
      .catch(error => console.error('Error fetching student statistics:', error));

    axios.get('http://localhost:5000/students')
      .then(response => setStudents(response.data || []))
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className='main-content'>
        <section className="search-section">
          <input
            type="text"
            value={searchRollNumber}
            onChange={(e) => setSearchRollNumber(e.target.value)}
            placeholder="Search by Roll Number"
          />
          <button onClick={handleSearch}>Search</button>
        </section>
        
        <section className="students-table-section">
          <h2>All Students</h2>
          <table className="students-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Class</th>
                <th>Address</th>
                <th>Contact Number</th>
                <th>Gender</th>
                <th>Batch Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchedStudent ? (
                <tr>
                  <td>{searchedStudent.name}</td>
                  <td>{searchedStudent.rollNumber}</td>
                  <td>{searchedStudent.class}</td>
                  <td>{searchedStudent.address}</td>
                  <td>{searchedStudent.contactNumber}</td>
                  <td>{searchedStudent.gender}</td>
                  <td>{searchedStudent.batchYear}</td>
                  <td>
                    <Link to={`/edit-student/${searchedStudent._id}`}>
                      <button className='edit-button'>Edit</button>
                    </Link>
                    <button className="delete-button" onClick={() => handleDelete(searchedStudent._id)}>Delete</button>
                  </td>
                </tr>
              ) : (
                students.map(student => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.rollNumber}</td>
                    <td>{student.class}</td>
                    <td>{student.address}</td>
                    <td>{student.contactNumber}</td>
                    <td>{student.gender}</td>
                    <td>{student.batchYear}</td>
                    <td>
                      <Link to={`/edit-student/${student._id}`}>
                        <button className='edit-button'>Edit</button>
                      </Link>
                      <button className="delete-button" onClick={() => handleDelete(student._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default AllStudents;
