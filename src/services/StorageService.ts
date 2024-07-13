import AsyncStorage from "@react-native-community/async-storage";

type set = {
  (key: string, value: any): Promise<boolean>;
  (values: [string, any][]): Promise<boolean>;
};

const StorageService = {
  get: async <T extends unknown>(keys: string | string[]) => {
    try {
      const result =
        typeof keys === "string"
          ? await AsyncStorage.getItem(keys)
          : await AsyncStorage.multiGet(keys);

      return result
        ? Array.isArray(result)
          ? (result.reduce(
              (accumulator, [key, value]) => ({
                ...accumulator,
                [key]: value ? JSON.parse(value) : undefined,
              }),
              {}
            ) as T)
          : (JSON.parse(result) as T)
        : undefined;
    } catch {
      return undefined;
    }
  },

  set: (async (...params: any[]) => {
    try {
      if (Array.isArray(params[0])) {
        await AsyncStorage.multiSet(
          params[0].map(([key, value]) => [key, JSON.stringify(value)])
        );
      } else {
        await AsyncStorage.setItem(params[0], JSON.stringify(params[1]));
      }

      return true;
    } catch {
      return false;
    }
  }) as set,

  remove: async (...keys: string[]) => {
    try {
      keys.length === 1
        ? await AsyncStorage.removeItem(keys[0])
        : await AsyncStorage.multiRemove(keys);

      return true;
    } catch {
      return false;
    }
  },
};

export default StorageService;
