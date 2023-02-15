import React from 'react'
import './widgets.scss'
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
// import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
// import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { useNavigate } from 'react-router-dom'
import moment from 'moment/moment'
const Widgets = ({ data }) => {
  // data = data.data
  const navigate = useNavigate()
  function handleAttend(event) {
    console.log('hello')
    console.log(data.roomId)
    localStorage.setItem("HostId",data.hostId)
    localStorage.setItem("RoomId",data.roomId)
    navigate(`/class/${data.id}/${data.roomId}`)
  }
  // let data ;

  //     data = {
  //       title: "Web development Bootcamp",
  //       courseDesc:"This gives a complete insight about web dev ",
  //       date:"1-01-2023 1:00 PM"

  //     };

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.course_name}</span>
        <span className="desc">{data.description}</span>

        <span className="date">
          {moment(data.schedule_date).format('DD-MM-YYYY hh:mm a')}
        </span>
      </div>
      <div className="right">
        <div className="percentage positive"></div>
        <button
          type="button"
          onClick={handleAttend}
          className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
        >
          Attend
        </button>
      </div>
    </div>
  )
}

export default Widgets
