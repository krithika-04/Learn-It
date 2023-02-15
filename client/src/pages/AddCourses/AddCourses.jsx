import React, { useEffect, useState } from 'react'
import { firepadRef, paramsKey, userName, db } from '../../../firebase'
import '../home/home.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import moment from 'moment/moment'
import BasicDateTimePicker from '../../components/DateTimePicker/BasicDateTimePicker'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function AddCourses() {
  const [state, setState] = useState('')
  const [cname, setCname] = useState('')
  const [desc, setDesc] = useState('')
  const [sdate, setSdate] = useState('')
  const [hostId, setHostId] = useState('')
  const navigate = useNavigate()
  const connectedRef = db.database().ref('.info/connected')
  const participantRef = firepadRef.child('participants')
  const handleDate = (e) => {
    console.log(e)
    console.log('124')
    setSdate(e)
  }
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  const showToastSuccessMessage = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
  const showToastErrorMessage = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
  const [msg, setMsg] = useState('')
  const callBack = (e) => {
    setState(e)
  }
  const AddCourses = async (e) => {
    e.preventDefault()
    try {
      console.log('hii')
      console.log(sdate)
      if (!(cname && desc && sdate)) {
        console.log('123')
        showToastErrorMessage('Enter all the details to continue')
        return
      }

    

      connectedRef.on('value', async (snap) => {
        if (snap.val()) {
          console.log('jj')
          const defaultPreferences = {
            audio: true,
            video: false,
            screen: false,
          }
          let uname = JSON.parse(localStorage.getItem('profile')).username
          console.log(uname)
          const userRef = participantRef.push({
            uname,
            host: true,
            preference: defaultPreferences,
          })
          console.log(firepadRef.key)
          console.log(userRef.key)
          try {
            const res = await axios.post(
              `${import.meta.env.VITE_BASE_URL}/addCourse/${
                JSON.parse(localStorage.getItem('profile')).id
              }`,
              {
                course_name: cname,
                description: desc,
                schedule_date: sdate,
                roomId: firepadRef.key,
                hostId: userRef.key,
              },
              {
                headers: {
                  Authorization: localStorage.getItem('token'),
                },
              },
            )
            console.log(res)
            if (res.data.status) {
              showToastSuccessMessage(res.data.message)
              await delay(3000)
              window.location.reload()
            }
      
            console.log(res.data)
            setMsg(res.data)
          } catch (error) {
            console.log(error)
      setMsg(error)
      console.log(msg)
      if (error.response) {
        console.log(error.response)
        showToastErrorMessage(error.response.data.message)
        setMsg(error.response)
      }
          }
          //userRef.onDisconnect().remove();
        }
      })
     
    
    } catch (error) {
      console.log(error)
      setMsg(error)
      console.log(msg)
      if (error.response) {
        console.log(error.response)
        showToastErrorMessage(error.response.data.message)
        setMsg(error.response)
      }
    }
  }

  return (
    <div className="home">
      <Sidebar value={state} />
      <div className="homeContainer">
        <Navbar callBack={callBack} />

        <div className="relative flex flex-col justify-center mt-6 overflow-hidden">
          <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-left text-purple-700 uppercase">
              Add a new Course
            </h1>
            <form className="mt-6">
              <div className="mb-2">
                <label
                  htmlFor="cname"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Course Name
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={cname}
                  onChange={(e) => {
                    setCname(e.target.value)
                  }}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="desc"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Description
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={desc}
                  onChange={(e) => {
                    setDesc(e.target.value)
                  }}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="sdate"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Schedule date
                </label>
                {/* <input
                            type="date"
                            
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={sdate}
                            onChange={(e)=>{
                          console.log(e.target.value) 
                                setSdate(e.target.value)}}
                        /> */}

                <BasicDateTimePicker handleDate={handleDate} />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  onClick={AddCourses}
                  className="w-1/2 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-900 border border-transparent rounded-md active:bg-gray-900"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AddCourses
