import './App.css'
import Login from './pages/Login/Login'
import Registration from './pages/SignUp/SignUp'
import Dashboard from './pages/Dashboard/Dashboard'
import Home from './pages/home/Home'
import RegistrationT from './pages/SignUp/SignUpT'
import Class from './pages/class/Class'
import AddCourses from './pages/AddCourses/AddCourses'
import AttendedCourses from './pages/AttendedCourses/AttendedCourses'
import TodaySchedule from './pages/TodaySchedule/TodaySchedule'
import ClassNotFound from './pages/ErrorPages/ClassNotFound'
import ForgotPass from './pages/ForgotPass/ForgotPass'
import ResetPass from './pages/ResetPass/ResetPass'
import Logout from '../src/components/logout/Logout'

import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
  useRoutes,
} from 'react-router-dom'
const element = <Login />
function AppRoutes() {
  const routes = useRoutes(['/login', '/'].map((path) => ({ path, element })))
  return routes
}
function App() {
  return (
    <Router>
      <AppRoutes />
      <Switch>
        <Route path="/registerS" element={<Registration />} />
        <Route path="/registerT" element={<RegistrationT />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/class/:c_id/:id" element={<Class />} />
        <Route path="/dummy-route" element={<Dashboard />} />
        <Route path="/attendedCourses" element={<AttendedCourses/>}/>
        <Route path="/todaySchedule" element={<TodaySchedule />} />
        <Route path='/room-not-found' element={<ClassNotFound/>}/>
        <Route path="/forgotPass" element={<ForgotPass />} />
        <Route path="/resetPassword/:id/:token/" element={<ResetPass />} />
        <Route path="/add-courses" element={<AddCourses />} />
        <Route path="/logout" element={<Logout />} />
      </Switch>
    </Router>
  )
}

export default App
//export default App
