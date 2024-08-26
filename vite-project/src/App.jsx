import { useState } from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import StudentList from './StudentList';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import AdminDashboard from './AdminDashboard';
import AllStudents from './Components/AllStudents/AllStudents';
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  const router=createBrowserRouter([
   
    {
      path:'/',
      element:    <><AdminDashboard/></>
    },
    {
        path:'/students',
        element:    <><AllStudents/></>
      },
      {
        path:'/add-student',
        element:    <><AddStudent/></>
      },
      {
        path:'/edit-student/:id',
        element:    <><EditStudent/></>
      },
    
  ])
  
  return (
    <>

    <RouterProvider router={router} />
    </>
  )
}

export default App
