import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDatabase, ref, child, get } from 'firebase/database'
import { db } from '../../../firebase'
import ClassFooter from '../../components/ClassFooter/ClassFooter'
import ClassHeader from '../../components/ClassHeader/ClassHeader'
import Messenger from '../../components/Messenger/Messenger'
import { useNavigate } from 'react-router-dom'
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import './class.scss'
import axios from 'axios'
import Screen from '../../components/Screen/Screen'
import { connect } from 'react-redux'
import {
  setUser,
  addParticipant,
  removeParticipant,
  setUserStream
} from '../../store/actionCreater'
function Class(props) {
  const { c_id } = useParams()
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState()
  const [participants, setParticipants] = useState()
  const firepadRef = firebase.database().ref()
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((mediaStream) => {
        mediaStream.getVideoTracks()[0].enabled = false
        console.log(mediaStream)
        props.setUserStream(mediaStream)                                                    // console.log(mediaStream)
      })
    fireBaseFunction()
  }, [])
  useEffect(() => {
    const studentRef = firepadRef.child(id).child('participants')
    if (props.user) {
      studentRef.on('child_added', async (snap) => {
        const { uname, host, preference } = snap.val()
        console.log('pref', preference)
        props.addParticipant({
          [snap.key]: {
            uname,
            host,
            ...preference,
          },
        })
      })
      studentRef.on('child_removed', async (snap) => {
        props.removeParticipant(snap.key)
        console.log('removed')
        try {
          console.log('disconnect called')
          const res = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/leave-class/${
              JSON.parse(localStorage.getItem('profile')).id
            }`,
            {
              courseId: c_id,
            },
            {
              headers: {
                Authorization: localStorage.getItem('token'),
              },
            },
          )
          console.log(res)
        } catch (error) {
          console.log('error on disconnect', error.message)
        }
      })
    }
  }, [props.user])

  const fireBaseFunction = async () => {
    console.log(id)
    const status = await get(child(firepadRef, id))
    console.log(status)

    console.log(status.exists())
    if (!status.exists()) {
      navigate('/room-not-found', { replace: true })
      return
    }
    const connectedRef = db.database().ref('.info/connected')
    console.log(connectedRef.key)
    const studentRef = firepadRef.child(id).child('participants')
    console.log(studentRef.key)

    if (JSON.parse(localStorage.getItem('profile')).user_type == 'S') {
      console.log('hey', id)
      connectedRef.on('value', async (snap) => {
        console.log(snap)
        if (snap.val()) {
          const defaultPreferences = {
            audio: true,
            video: false,
            screen: false,
          }
          let uname = JSON.parse(localStorage.getItem('profile')).username
          const userRef = await studentRef.push({
            uname,
            host: false,
            preference: defaultPreferences,
          })
          console.log(userRef)
          try {
            console.log('disconnect called')
            const res = await axios.post(
              `${import.meta.env.VITE_BASE_URL}/leave-class/${
                JSON.parse(localStorage.getItem('profile')).id
              }`,
              {
                courseId: c_id,
              },
              {
                headers: {
                  Authorization: localStorage.getItem('token'),
                },
              },
            )
            console.log(res)
          } catch (error) {
            console.log('error on disconnect', error.message)
          }
          try {
            const res = await axios.post(
              `${import.meta.env.VITE_BASE_URL}/make-attendance/${
                JSON.parse(localStorage.getItem('profile')).id
              }`,
              {
                courseId: c_id,
              },
              {
                headers: {
                  Authorization: localStorage.getItem('token'),
                },
              },
            )
            console.log(res)
          } catch (error) {
            console.log(error.message)
          }
          props.setUser({
            [userRef.key]: {
              uname,
              host: false,
              ...defaultPreferences,
            },
          })

          console.log(props)
          userRef.onDisconnect().remove()
          // console.log(firepadRef.key)
          // console.log(userRef.key)
        }
      })
    } else if (JSON.parse(localStorage.getItem('profile')).user_type == 'T') {
      const hostId = localStorage.getItem('HostId')
      console.log(hostId)
      const hostData = await get(child(studentRef, hostId))
      console.log(hostData.child(hostId))
      const { uname, host, preference } = hostData.val()
      console.log(uname)
      console.log(host)
      console.log(preference)
      console.log(status.val())
      props.setUser({
        [hostData.key]: {
          uname,
          host: false,
          ...preference,
        },
      })
    }
  }

  if (props.user) {
    return (
      <div>
        <Screen />
      </div>
    )
  } else {
    return <></>
  }
}

const mapStateToProps = (state) => {
  console.log('parti ', state)
  return {
    user: state.reducer.currentUser,
    participants: state.reducer.participants,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserStream: (stream) => dispatch(setUserStream(stream)),
    setUser: (user) => dispatch(setUser(user)),
    addParticipant: (participant) => dispatch(addParticipant(participant)),
    removeParticipant: (participantKey) =>
      dispatch(removeParticipant(participantKey)),
   
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Class)
{
  /* <div className="classContainer">
<div>user:{JSON.stringify(props.user)}</div>
<div>participants:{JSON.stringify(props.participants)}</div>
{/* <video src="" className="videoContainer" controls></video>
<ClassHeader />
<ClassFooter />

<Messenger /> */
}
{
  /* 
<MeetingInfo/>
 */
}
// </div> */}
