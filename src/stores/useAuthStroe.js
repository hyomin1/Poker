import { create } from 'zustand';

const useAuthStore = create((set) => ({
  subId: '',
  setSubId: (subId) => set({ subId }),
  userId: '',
  setUserId: (userId) => set({ userId }),
}));

export default useAuthStore;
