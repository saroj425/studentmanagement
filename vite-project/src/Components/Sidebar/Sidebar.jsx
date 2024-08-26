import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>
        <div className="sidebar">
            <h4 className='mb-0 pt-2 text-center '>Admin Dashboard</h4>
            <hr/>
            <div className='sidebar-inner'>
                <ul>
                    <li><Link to="/"  style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link></li>
                    <li> <Link to="/add-student"  style={{ color: 'white', textDecoration: 'none' }}> Add New Student </Link> </li>
                    <li> <Link to="/students"  style={{ color: 'white', textDecoration: 'none' }}> View All Student </Link> </li>            
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Sidebar