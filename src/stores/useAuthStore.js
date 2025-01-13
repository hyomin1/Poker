import { create } from 'zustand';

const useAuthStore = create((set) => ({
  subId: '',
  setSubId: (subId) => set({ subId }),
  userId: '',
  setUserId: (userId) => set({ userId }),
  password: '',
  setPassword: (password) => set({ password }),
}));

export default useAuthStore;
