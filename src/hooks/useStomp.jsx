import useStompStore from '../stores/useStompStore';

export default function useStomp() {
  const { stompClient, initializeStompClient } = useStompStore();

  const connect = ({ userId, password }) => {
    initializeStompClient(userId, password);
  };

  const subscribe = (subscriptions) => {
    if (!stompClient) {
      return;
    }

    stompClient.onConnect = () => {
      console.log('연결됨');
      subscriptions.forEach(({ url, callback, player_id }) => {
        const headers = { player_id };
        stompClient.subscribe(url, callback, headers);
      });
    };
  };

  const sendMessage = (destination, board, PlayerId) => {
    const headers = {
      PlayerId,
      board_id: board.id,
    };
    stompClient.publish({
      destination,
      body: JSON.stringify(board),
      headers,
    });
  };

  const disconnect = () => {};

  return { connect, subscribe, sendMessage, disconnect };
}
