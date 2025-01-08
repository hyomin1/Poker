import { create } from 'zustand';

const useBoardStore = create((set) => ({
  boardId: '',
  setBoardId: (boardId) => set({ boardId }),
}));

export default useBoardStore;
