import { create } from "zustand";

type State = {
  isModalOpen: boolean;
};

type Action = {
  openAddUserModal: () => void;
  closeAddUserModal: () => void;
};

const ModalOpenStore = create<State & Action>((set) => ({
  isModalOpen: false,

  openAddUserModal: () => {
    set({ isModalOpen: true });
  },

  closeAddUserModal: () => {
    set({ isModalOpen: false });
  },
}));

export default ModalOpenStore;
