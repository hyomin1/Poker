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

  const sendExitMessage = (destination, board, boardId) => {
    const headers = { board_id: boardId };
    stompClient.publish({
      destination,
      body: JSON.stringify(board),
      headers,
    });
  };

  const disconnect = (subId) => {
    stompClient.disconnectHeaders = {
      disconnect_option: 'disconnect',
      player_id: subId,
    };
    stompClient.deactivate();
  };

  const exitDisconnect = () => {
    stompClient.disconnectHeaders = {
      disconnect_option: 'exit',
    };
    stompClient.deactivate();
  };

  return {
    connect,
    subscribe,
    sendMessage,
    sendExitMessage,
    disconnect,
    exitDisconnect,
  };
}
