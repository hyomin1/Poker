import * as StompJs from "@stomp/stompjs";

export const client = new StompJs.Client({
  brokerURL: "ws://localhost:8080/ws",
  forceBinaryWSFrames: true,
  appendMissingNULLonIncoming: true,

  debug: function (str) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});
