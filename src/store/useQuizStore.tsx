import create from 'zustand';

type State = {
  isHelpOpen: boolean;
  
};

type Actions = {
  toggleHelp: (newValue: boolean) => void;
};

export const useQuizStore = create<State & Actions>((set) => ({
  isHelpOpen: false,
  toggleHelp: (newValue) => set({ isHelpOpen: newValue }),
}));
