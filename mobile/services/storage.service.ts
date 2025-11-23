import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

class StorageService {
  private isWeb = Platform.OS === "web";

  async setItem(key: string, value: string): Promise<void> {
    try {
      if (this.isWeb) {
        // Web: Use AsyncStorage (localStorage wrapper)
        await AsyncStorage.setItem(key, value);
      } else {
        // Native: Use SecureStore
        await SecureStore.setItemAsync(key, value);
      }
    } catch (error) {
      console.error(`Error setting ${key}:`, error);
      throw error;
    }
  }

  async getItem(key: string): Promise<string | null> {
    try {
      if (this.isWeb) {
        // Web: Use AsyncStorage
        return await AsyncStorage.getItem(key);
      } else {
        // Native: Use SecureStore
        return await SecureStore.getItemAsync(key);
      }
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      if (this.isWeb) {
        // Web: Use AsyncStorage
        await AsyncStorage.removeItem(key);
      } else {
        // Native: Use SecureStore
        await SecureStore.deleteItemAsync(key);
      }
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      if (this.isWeb) {
        // Web: Clear AsyncStorage
        await AsyncStorage.clear();
      } else {
        // Native: Clear all SecureStore items manually
        // Note: SecureStore doesn't have a clear all method
        // You need to track and delete keys individually
        const keys = ["accessToken", "refreshToken", "user"];
        await Promise.all(
          keys.map((key) => SecureStore.deleteItemAsync(key).catch(() => {}))
        );
      }
    } catch (error) {
      console.error("Error clearing storage:", error);
      throw error;
    }
  }
}

export const storageService = new StorageService();
