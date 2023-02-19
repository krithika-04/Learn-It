import React,{useRef,useEffect} from 'react'
import './Screen.scss'
import Participants from '../Participants/Participants'
import ClassFooter from '../ClassFooter/ClassFooter'
import { connect } from "react-redux";
import { setUserStream,updateUser } from "../../store/actionCreater";
function Screen(props) {
  const participantRef = useRef(props.participants);
  const onMicClick = (micEnabled) => {
    if (props.stream) {
      props.stream.getAudioTracks()[0].enabled = micEnabled;
      props.updateUser({ audio: micEnabled });
    }
  };
  const onVideoClick = (videoEnabled) => {
    if (props.stream) {
      props.stream.getVideoTracks()[0].enabled = videoEnabled;
      props.updateUser({ video: videoEnabled });
    }
  };
  
  useEffect(() => {
    participantRef.current = props.participants;
  }, [props.participants]);
  return (
    <div className="wrapper">
      <div className="mainScreen">
        <Participants/>
      </div>
      <div className="footer">
        <ClassFooter
         
         onMicClick={onMicClick}
         onVideoClick={onVideoClick}/>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    stream: state.reducer.mediaStream,
    participants: state.reducer.participants,
    currentUser: state.reducer.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserStream: (stream) => dispatch(setUserStream(stream)),
    updateUser: (user) => dispatch(updateUser(user)),
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Screen)
