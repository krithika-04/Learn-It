import React, { useState } from 'react'
import '../home/home.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import moment from 'moment/moment'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function AttendedCourses() {
  const [state, setState] = useState('')
  const navigate = useNavigate()

  const callBack = (e) => {
    setState(e)
  }

  return (
    <div className="home">
      <Sidebar value={state} />
      <div className="homeContainer">
        <Navbar callBack={callBack} />
        <div>
          <h5>abc</h5>
        </div>
      </div>
    </div>
  )
}

export default AttendedCourses
