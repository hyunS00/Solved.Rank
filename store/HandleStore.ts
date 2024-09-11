// userHandlesStore.js
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_HANDLES_KEY = "UserHandles";

type State = {
  handleList: string[];
};

type Action = {
  loadHandleList: () => void;
  addHandleList: (handle: string) => Promise<boolean>;
  removeHandleList: (handle: string) => Promise<boolean>;
};

const handleStore = create<State & Action>((set, get) => ({
  handleList: [],

  loadHandleList: async () => {
    try {
      const storedHandles = await AsyncStorage.getItem(USER_HANDLES_KEY);
      if (storedHandles !== null) {
        set({ handleList: JSON.parse(storedHandles) });
      }
    } catch (error) {
      console.error("Failed to load user handles:", error);
    }
  },

  addHandleList: async (handle: string) => {
    const { handleList } = get();
    if (handle.trim() === "" || handleList.includes(handle)) return false;

    try {
      const updatedHandles = [...handleList, handle];
      await AsyncStorage.setItem(
        USER_HANDLES_KEY,
        JSON.stringify(updatedHandles)
      );
      set({ handleList: updatedHandles });
      return true;
    } catch (error) {
      console.error("Failed to add user handle:", error);
      return false;
    }
  },

  removeHandleList: async (handle: string) => {
    const { handleList } = get();
    try {
      const updatedHandles = handleList.filter((h) => h !== handle);
      await AsyncStorage.setItem(
        USER_HANDLES_KEY,
        JSON.stringify(updatedHandles)
      );
      set({ handleList: updatedHandles });
      return true;
    } catch (error) {
      console.error("Failed to remove user handle:", error);
      return false;
    }
  },
}));

export default handleStore;
