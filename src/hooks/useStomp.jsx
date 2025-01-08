import useStompStore from '../stores/useStompStore';

export default function useStomp() {
  const { stompClient, initializeStompClient } = useStompStore();

  const connect = ({ userId, password }) => {
    initializeStompClient(userId, password);
  };

  const isConnected = () => {
    console.log(stompClient);
  };

  const subscribe = (url, callback) => {
    if (!stompClient) {
      return;
    }
    stompClient.onConnect = () => {
      console.log('연결됨');
      stompClient.subscribe(url, callback);
    };
  };

  const sendMessage = (destination, message) => {};

  const disconnect = () => {};

  return { connect, isConnected, subscribe, sendMessage, disconnect };
}
