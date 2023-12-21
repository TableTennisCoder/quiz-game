import {create} from "zustand";

const useStore = create((set) => ({
  activeQuestionIndex: 0,
  setActiveQuestionIndex: (index) => set({activeQuestionIndex: index}),
  resetActiveQuestionIndex: () => set({activeQuestionIndex: 0}),
}));

export const usePlayersStore = create((set) => ({
  players: [],
}));

export default useStore;
