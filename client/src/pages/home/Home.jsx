import { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Widgets from '../../components/widgets/Widgets'
import axios from 'axios'
// import Featured from "../../components/featured/Featured";
// import Chart from "../../components/chart/Chart"
import './home.scss'

const Home = () => {
  const [state, setState] = useState()
  const [courseData, setCourseData] = useState()
  const callBack = (e) => {
    console.log(e)
    setState(e)
  }
  useEffect(() => {
    const getCourseData = async () => {
      if (
        localStorage.getItem('profile') &&
        JSON.parse(localStorage.getItem('profile')).user_type == 'S'
      ) {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/getAllcourses`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        setCourseData(res.data.data)
        console.log(res.data.data)
      } else if (
        localStorage.getItem('profile') &&
        JSON.parse(localStorage.getItem('profile')).user_type == 'T'
      ) {
        console.log('hii')
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/getAllcourses/${
            JSON.parse(localStorage.getItem('profile')).id
          }`,
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          },
        )
        setCourseData(res.data.data)
        console.log(res.data.data)
      }
    }
    getCourseData()
  }, [])
  // const courseData = {
  //   title: "Web development Bootcamp",
  //   courseDesc:"This gives a complete insight about web dev ",
  //   date:"1-01-2023 1:00 PM"

  // };
  if (courseData) {
    return (
      <div className="home">
        <Sidebar value={state} />
        <div className="homeContainer">
          <Navbar callBack={callBack} />
          <div className="widgets">
            {/* {
                courseData.map((course,index)=>{
                  return <Widgets key={index} data={course} />

                })
              } */}
            {courseData.map((ele, index) => {
              return <Widgets key={ele.id} data={ele}></Widgets>
            })}
          </div>
        </div>
      </div>
    )
  } else {
    return <>loading.....</>
  }
}

export default Home
