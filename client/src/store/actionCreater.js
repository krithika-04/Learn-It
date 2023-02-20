import { ADD_PARTICIPANT, REMOVE_PARTICIPANT, SET_USER,SET_USER_STREAM,UPDATE_USER,UPDATE_PARTICIPANT } from "./actionTypes";
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
  
  return {
    type: ADD_PARTICIPANT,
    payload: {
      participant
    },
  };
};
export const removeParticipant = (participantKey) => {
  console.log(participantKey)
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
export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    payload: {
      currentUser: user,
    },
  };
};

export const updateParticipant = (user) => {
  return {
    type: UPDATE_PARTICIPANT,
    payload: {
      newUser: user,
    },
  };
};