import create from 'zustand';

type State = {
  isModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isRenameModalOpen: boolean;
  isAddQuizModalOpen: boolean;
};

type Actions = {
  toggleModal: (newValue: boolean) => void;
  toggleDeleteModal: (newValue: boolean) => void;
  toggleRenameModal: (newValue: boolean) => void;
  toggleAddQuizModal: (newValue: boolean) => void;
};

export const useModalStore = create<State & Actions>((set) => ({
  isModalOpen: false,
  isDeleteModalOpen: false,
  isRenameModalOpen: false,
  isAddQuizModalOpen: false,
  toggleModal: (newValue) => set({ isModalOpen: newValue }),
  toggleDeleteModal: (newValue) => set({ isDeleteModalOpen: newValue }),
  toggleRenameModal: (newValue) => set({ isRenameModalOpen: newValue }),
  toggleAddQuizModal: (newValue) => set({ isAddQuizModalOpen: newValue }),
}));