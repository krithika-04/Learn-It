import React from 'react'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserFriends,
  faCommentAlt,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons'
import './ClassHeader.scss'
function ClassHeader() {
  return (
    <div className="frameHeader">
      <div className="headerItems icon-block">
        <FontAwesomeIcon className="icon" icon={faUserFriends} />
      </div>
      <div className="headerItems icon-block">
        <FontAwesomeIcon className="icon" icon={faCommentAlt} />
        <span className="alert-circle-icon"></span>
      </div>
      <div className="headerItems date-block">1:00 PM</div>
      <div className="headerItems icon-block">
        <FontAwesomeIcon className="icon profile" icon={faUserCircle} />
      </div>
    </div>
  )
}

export default ClassHeader
