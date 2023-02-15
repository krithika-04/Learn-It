import React from 'react'
import './Screen.scss'
import Participants from '../Participants/Participants'
import ClassFooter from '../ClassFooter/ClassFooter'
function Screen() {
  return (
    <div className="wrapper">
      <div className="mainScreen">
        <Participants/>
      </div>
      <div className="footer">
        <ClassFooter/>
      </div>
    </div>
  )
}

export default Screen
