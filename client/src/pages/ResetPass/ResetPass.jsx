import axios from 'axios';
import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

function ResetPass() {
    const [password,setPassword]=useState('')
    const [cpassword,setCpassword]=useState('')
    const [msg,setMsg]=useState('')
    const navigate = useNavigate();
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );
    const showToastSuccessMessage = (msg) => {
        toast.success(msg, {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const showToastErrorMessage = (msg) => {
        toast.error(msg, {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const {id,token} = useParams()
    const ResetPass = async (e)=>{
    e.preventDefault();
    

    try {

    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/resetPassword/${id}/${token}`,{
        password:password,
        cpassword:cpassword
    })
    if(res.data.success){
        showToastSuccessMessage(res.data.message)
        await delay(2000)
        navigate('/login')
    }

    } catch (error) {
        if(error.response)
        {console.log(error.response)
            if(error.response.data.message=="jwt expired")
            {
                showToastErrorMessage("The link has been expired")   
                return
            }
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
        <form onSubmit={ResetPass} className="mt-6">
            <div className="mb-2">
                <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Password
                </label>
                <input
                    type="password"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
            </div>
            <div className="mb-2">
                <label
                    htmlFor="cpassword"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Confirm Password
                </label>
                <input
                    type="password"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={cpassword}
                    onChange={(e)=>{setCpassword(e.target.value)}}
                />
            </div>
         
            <div className="mt-6">
                <button className="w-1/3 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-900 border border-transparent rounded-md active:bg-gray-900">
                    Reset Password
                </button>
            </div>
            <ToastContainer />
        </form>
       
      

       
    </div>
</div>
  )
}

export default ResetPass