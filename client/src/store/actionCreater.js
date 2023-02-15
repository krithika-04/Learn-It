import { ADD_PARTICIPANT, REMOVE_PARTICIPANT, SET_USER,SET_USER_STREAM } from "./actionTypes";
export const setUser = (user) => {
  // console.log("user")
  return {
    type: SET_USER,
    payload: {
      currentUser: user,
    },
  };
};
export const addParticipant = (participant) => {
  console.log("inside addp")
  return {
    type: ADD_PARTICIPANT,
    payload: {
      participant
    },
  };
};
export const removeParticipant = (participantKey) => {
  return {
    type: REMOVE_PARTICIPANT,
    payload: {
      participantKey,
    },
  };
};
export const setUserStream = (stream) => {
   console.log("stream",stream)
  return {
    type: SET_USER_STREAM,
    payload: {
      mediaStream: stream,
    },
  };
};