import React, { useRef, useEffect,useState } from 'react'
import firebase from 'firebase/compat/app'
import './Screen.scss'
import { useNavigate } from 'react-router-dom'
import ChatScreen from '../ChatScreen/ChatScreen'
import Participants from '../Participants/Participants'
import ClassFooter from '../ClassFooter/ClassFooter'
import 'firebase/compat/database'
import { connect, useSelector } from 'react-redux'
import {
  setUserStream,
  updateUser,
  removeParticipant,
} from '../../store/actionCreater'
function Screen(props) {
  const [show,setShow] = useState(false);
  const currentUser = useSelector((state) => state.reducer.currentUser)
  const navigate = useNavigate()
  const participantRef = useRef(props.participants)
  const onMicClick = (micEnabled) => {
    if (props.stream) {
      props.stream.getAudioTracks()[0].enabled = micEnabled
      props.updateUser({ audio: micEnabled })
    }
  }
  const onVideoClick = (videoEnabled) => {
    if (props.stream) {
      props.stream.getVideoTracks()[0].enabled = videoEnabled
      props.updateUser({ video: videoEnabled })
    }
  }
  const onCutCall = async () => {
    const roomId = localStorage.getItem('RoomId')
    let firepadRef = firebase.database().ref()
    const participantRef = firepadRef.child(roomId).child('participants')
    const currentUserId = Object.keys(currentUser)[0]
    const currentUserRef = participantRef.child(currentUserId)
    console.log(currentUserRef)
    props.removeParticipant(currentUserId)
    await currentUserRef.remove()
    console.log('clicked cut the call')
    navigate('/dashboard')
    window.location.reload()
  }
const showChatScreen = ()=>{
  let prev = show;
  setShow(!prev);
}
  useEffect(() => {
    participantRef.current = props.participants
  }, [props.participants])
  return (
    <div className="wrapper">
      <div className="mainScreen">
      <div className="chat">
        <Participants />
        
          {show?<ChatScreen />:''}
        </div>
      </div>

      <div className="footer">
        <ClassFooter
          onCutCall={onCutCall}
          onMicClick={onMicClick}
          onVideoClick={onVideoClick}
          showChatScreen={showChatScreen}
        />
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    stream: state.reducer.mediaStream,
    participants: state.reducer.participants,
    currentUser: state.reducer.currentUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserStream: (stream) => dispatch(setUserStream(stream)),
    updateUser: (user) => dispatch(updateUser(user)),
    removeParticipant: (user) => dispatch(removeParticipant(user)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Screen)
