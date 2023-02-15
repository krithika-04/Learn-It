import './navbar.scss'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
// import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
// import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
// import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
// import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
// import Sidebar from '../sidebar/Sidebar';
//import Home from '../../pages/home/Home';
import { useEffect, useState } from 'react'
import EastIcon from '@mui/icons-material/East'
//import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
//import { useContext } from "react";
//import { darkModeContext } from "../../context/darkModeContext"

const Navbar = ({ callBack }) => {
  //const {dispatch} = useContext(darkModeContext)
  let [show, setShow] = useState(true)
  function changeSidebar() {
    setShow(!show)
    // console.log("navbar",show);
    callBack(show)
    // <Home data={show} />
  }
  // useEffect(()=>{
  //       callBack(show)
  // },[show])
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="item " onClick={changeSidebar}>
          {show ? <MenuOpenIcon className="icon" /> : <EastIcon />}
        </div>
        {localStorage.getItem('profile') && (
          <h5>{`Welcome ,  ${
            JSON.parse(localStorage.getItem('profile')).username
          }`}</h5>
        )}
        <div className="items">
          <div className="item">
            <div className="search">
              <input type="text" placeholder="search.." />
              <SearchOutlinedIcon />
            </div>
          </div>
          {/* <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div> */}
          {/* <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div> */}
          {/* <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div> */}
          {/* <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div> */}
          {/* https://images.pexels.com/photos/6907828/pexels-photo-6907828.png */}
          <div className="item">
            <img
              // src={localStorage.getItem("profile")? JSON.parse(localStorage.getItem("profile")).picture:"https://images.pexels.com/photos/6907828/pexels-photo-6907828.png"}
              src="https://images.pexels.com/photos/6907828/pexels-photo-6907828.png "
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
