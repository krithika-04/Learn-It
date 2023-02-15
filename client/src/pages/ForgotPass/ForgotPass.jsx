import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ForgotPass() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()
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
  const ForgotPass = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/forgotPass`, {
        email: email,
      })
      if (res.data.success) {
        showToastSuccessMessage(res.data.message)
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response)

        showToastErrorMessage(error.response.data.message)

        setMsg(error.response)
      }
    }
  }
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h6 className="text-2xl font-medium text-center text-purple-700 ">
          Enter your email to get reset password link
        </h6>
        <form onSubmit={ForgotPass} className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>

          <div className="mt-6">
            <button className="w-1/3 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-900 border border-transparent rounded-md active:bg-gray-900">
              Get reset link
            </button>
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  )
}

export default ForgotPass
