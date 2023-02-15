import React from 'react'
import firebase from 'firebase/compat/app'
import { useNavigate } from 'react-router-dom'
import 'firebase/compat/database'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faVideo,
  faMicrophone,
  faPhone,
  faAngleUp,
  faClosedCaptioning,
  faDesktop,
  faMicrophoneSlash,
} from '@fortawesome/free-solid-svg-icons'
import './ClassFooter.scss'
import {

  removeParticipant

} from '../../store/actionCreater'
import {useSelector,connect} from 'react-redux'
function ClassFooter(props) {
  const currentUser = useSelector((state)=>state.reducer.currentUser)
  const navigate = useNavigate()
  const handleCutCall =async ()=>{

    const roomId = localStorage.getItem('RoomId')
    let firepadRef = firebase.database().ref()
    const participantRef = firepadRef.child(roomId).child('participants')
    const currentUserId = Object.keys(currentUser)[0]
    const currentUserRef = participantRef.child(currentUserId)
    console.log(props)
    console.log(currentUserRef)
    props.removeParticipant(currentUserId)
    await currentUserRef.remove()

  
    console.log("clicked cut the call")
navigate('/dashboard')
  }
  return (
   <div className='meetingFooter'>
    <div className='meetingIcons'>
        <FontAwesomeIcon
        icon={faMicrophone}/>
    </div>
    <div className='meetingIcons'>
    <FontAwesomeIcon
        icon={faVideo}/>
    </div>
    <div className='meetingIcons'>
      <FontAwesomeIcon
      icon={faDesktop}/>
    </div>
    <div className='meetingIcons'>
      <FontAwesomeIcon
      icon={faPhone} onClick={handleCutCall}/>
    </div>
   </div>
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    removeParticipant: (participantKey) =>
      dispatch(removeParticipant(participantKey))
   
  }
}
export default connect(null,mapDispatchToProps)(ClassFooter)


{/* <div className="footer-item">
<div className="left-item">
  <div className="icon-block">
    Meeting details
    <FontAwesomeIcon className="icon" icon={faAngleUp} />
  </div>
</div>
<div className="center-item">
  <div className="icon-block  ">
    <FontAwesomeIcon className="icon" icon={faMicrophone} />
  </div>
  <div className="icon-block">
    <FontAwesomeIcon className="icon red" icon={faPhone} />
  </div>
  <div className="icon-block">
    <FontAwesomeIcon className="icon" icon={faVideo} />
  </div>
</div>
<div className="right-item">
  <div className="icon-block">
    <FontAwesomeIcon className="icon red" icon={faClosedCaptioning} />
    <p className="title">Turn on captions</p>
  </div>

  {/* {isPresenting ? ( */}
  // <div className="icon-block">
  //   <FontAwesomeIcon className="icon red" icon={faDesktop} />
  //   <p className="title">Stop presenting</p>
  // </div>
  {/* ) : ( */}
  {/* // <div className="icon-block" onClick={screenShare}>
  //   <FontAwesomeIcon className="icon red" icon={faDesktop} />
  //   <p className="title">Present now</p>
  // </div> */}
  {/* )} */}
// </div>
// </div> */}