import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import InsertChartIcon from '@mui/icons-material/InsertChart'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SettingsIcon from '@mui/icons-material/Settings'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import LogoutIcon from '@mui/icons-material/Logout'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import ListOutlined from '@mui/icons-material/ListOutlined'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import AddBoxIcon from '@mui/icons-material/AddBox'
import ScheduleIcon from '@mui/icons-material/Schedule'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import { Link } from 'react-router-dom'
import { padding } from '@mui/system'
//import { useContext } from "react";
// import { darkModeContext } from "../../context/darkModeContext"
const Sidebar = ({ value }) => {
  // const {dispatch,darkMode} = useContext(darkModeContext)

  return (
    <div className={`sidebar ${!value ? '' : 'collapsed'}`}>
      <div className="top">LearnIt</div>
      <div className="center">
        <ul>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <li>
              <div
                style={
                  !value
                    ? {
                        display: 'flex',
                        justifyContent: 'center',
                        paddingRight: '60px',
                      }
                    : {
                        display: 'flex',
                        justifyContent: 'center',
                        paddingRight: '0px',
                      }
                }
              >
                <DashboardIcon className="icon" />
                <span>Dashboard</span>
              </div>
            </li>
          </Link>

          <Link to="/todaySchedule" style={{ textDecoration: 'none' }}>
            <li>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ScheduleIcon className="icon" />
                <span>Today's Schedule</span>
              </div>
            </li>
          </Link>
          {localStorage.getItem('profile') &&
          JSON.parse(localStorage.getItem('profile')).user_type == 'T' ? (
            <Link to="/attendance" style={{ textDecoration: 'none' }}>
              <li>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <InsertChartIcon className="icon" />
                  <span>Attendance</span>
                </div>
              </li>
            </Link>
          ) : (
            <Link to="/attendedCourses" style={{ textDecoration: 'none' }}>
              <li>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <AssignmentTurnedInIcon className="icon" />
                  <span>Attended Courses</span>
                </div>
              </li>
            </Link>
          )}

          {/* <li>
                    <NotificationsNoneIcon className='icon'/>
                    <span>Notifications</span>
                </li> */}
          {localStorage.getItem('profile') &&
          JSON.parse(localStorage.getItem('profile')).user_type == 'T' ? (
            <Link to="/add-courses" style={{ textDecoration: 'none' }}>
              <li>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <AddBoxIcon className="icon" />
                  <span>Add Courses</span>
                </div>
              </li>
            </Link>
          ) : (
            <></>
          )}

          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <li>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <AccountBoxIcon className="icon" />
                <span>Profile</span>
              </div>
            </li>
          </Link>

          <Link to="/logout" style={{ textDecoration: 'none' }}>
            <li>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <LogoutIcon className="icon" />
                <span>Logout</span>
              </div>
            </li>
          </Link>
        </ul>
      </div>

      <div className={`bottom ${!value && 'flex'}`}>
        {/* <div className="colorOption" onClick={()=>{
            dispatch({type:"LIGHT"})
        }}></div>
        <div className="colorOption"  onClick={()=>{
            dispatch({type:"DARK"})
        }}></div>    */}
      </div>
    </div>
  )
}

export default Sidebar
