import * as StompJs from '@stomp/stompjs';

export const createStompClient = ({ userId, password }) => {
  return new StompJs.Client({
    brokerURL: process.env.REACT_APP_STOMP_URL,
    forceBinaryWSFrames: true,
    appendMissingNULLonIncoming: true,

    debug: function (str) {
      // console.log(str);
    },
    connectHeaders: {
      userId,
      password,
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,

    onStompError(frame) {
      console.log('STOMP 에러', frame);
    },
  });
};
