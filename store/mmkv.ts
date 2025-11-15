// mmkv is a key-value store for React Native
// we are using it to persist data across app restarts.
import { createMMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

export const storage = createMMKV({
  id: "mmkv-store", // id of the store
});

export const zustandStorage: StateStorage = {
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value || null;
  },
  setItem: (name: string, value: string) => {
    storage.set(name, value);
  },
  removeItem: (name: string) => {
    storage.remove(name);
  },
};
