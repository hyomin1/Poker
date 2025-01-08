import { create } from 'zustand';
import { createStompClient } from '../api/stompClient';

const useStompStore = create((set) => ({
  stompClient: null,
  initializeStompClient: (userId, password) => {
    const stompClient = createStompClient({ userId, password });
    stompClient.activate();

    set({ stompClient });
  },
}));

export default useStompStore;
