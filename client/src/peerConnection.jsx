import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { store } from '../src/main'
const createOffer = async (peerConnection, creatorId, receiverId) => {
  console.log('inside create offer')
  const roomId = localStorage.getItem('RoomId')

  let firepadRef = firebase.database().ref()

  const participantRef = firepadRef.child(roomId).child('participants')
  const receiverRef = participantRef.child(receiverId)

  const offer = await peerConnection.createOffer()
  peerConnection.onicecandidate = (event) => {
    event.candidate &&
      receiverRef
        .child('offerCandidates')
        .push({ ...event.candidate.toJSON(), userId: creatorId })
  }
  await peerConnection.setLocalDescription(offer)
  const offerPayload = {
    sdp: offer.sdp,
    type: offer.type,
    userId: creatorId,
  }
  console.log(receiverRef.key)
  await receiverRef.child('offers').push().set({ offerPayload })

}
const initializeListener = (currentUserId) => {
  // id of user in the current screen
  console.log("inside initializer",currentUserId)
  const roomId = localStorage.getItem('RoomId')
  let firepadRef = firebase.database().ref()
  const participantRef = firepadRef.child(roomId).child('participants')
  const receiverRef = participantRef.child(currentUserId)
  receiverRef.child('offers').on('child_added', async (snap) => {
    const data = snap.val()
    console.log(data)
    if (data?.offerPayload) {
        console.log("123456")
      const creatorId = data?.offerPayload.userId
      const peerConnection = store.getState().reducer.participants[creatorId].peerConnection
        console.log(peerConnection)
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data?.offerPayload),
      )
      // create answer
      createAnswer(peerConnection, currentUserId, creatorId)
    }
  })
  receiverRef.child('offerCandidates').on('child_added', async (snap) => {
    const data = snap.val()
    if (data?.userId) {
      const creatorId = data?.userId
      const peerConnection = store.getState().reducer.participants[creatorId].peerConnection
      peerConnection.addIceCandidate(new RTCIceCandidate(data))
    }
  })
  receiverRef.child('answers').on('child_added', async (snap) => {
    const data = snap.val()
    if (data?.answerPayload) {
      const creatorId = data?.answerPayload.userId
      const peerConnection = store.getState().reducer.participants[creatorId].peerConnection
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data?.answerPayload),
      )
    }
  })
  receiverRef.child('answerCandidates').on('child_added', async (snap) => {
    const data = snap.val()
    if (data?.userId) {
      const creatorId = data?.userId
      const peerConnection = store.getState().reducer.participants[creatorId].peerConnection
      peerConnection.addIceCandidate(new RTCIceCandidate(data))
    }
  })
}
const createAnswer = async (peerConnection, currentUserId, receiverId) => {
  console.log('inside create answer')
  const roomId = localStorage.getItem('RoomId')

  let firepadRef = firebase.database().ref()

  const participantRef = firepadRef.child(roomId).child('participants')
  const receiverRef = participantRef.child(receiverId)

  const answer = await peerConnection.createAnswer()
  peerConnection.onicecandidate = (event) => {
    event.candidate &&
      receiverRef
        .child('answerCandidates')
        .push({ ...event.candidate.toJSON(), userId: currentUserId })
  }
  await peerConnection.setLocalDescription(answer)
  const answerPayload = {
    sdp: answer.sdp,
    type: answer.type,
    userId: currentUserId,
  }
  console.log(receiverRef.key)
  await receiverRef.child('answers').push().set({ answerPayload })

}
export { createOffer, initializeListener, createAnswer }
