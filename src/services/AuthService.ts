import { ApiService, StorageService } from ".";
import { clearAppState, setTokens } from "../store/slices/appSlice";
import {
  enableApiErrorInterceptor,
  removeOauthInterceptor,
  setOauthRequestInterceptor,
} from "../utils/axios";
import { Token } from "./../types/index";
import store from "../store/configureStore";

export const clearT = async () => {
  await StorageService.remove("token");
  store.dispatch(clearAppState());
};

const AuthService = {
  waitForNewToken: false,

  setOnAppStartInterceptors: () => {
    enableApiErrorInterceptor();

    AuthService.getToken().then((token) => {
      if (token) {
        setOauthRequestInterceptor(`Bearer ${token.access_token}`);
      }
    });
  },

  setToken: (token: Token) => {
    return StorageService.set("token", token);
  },

  getToken: async () => {
    const token = await StorageService.get<string>("token");

    return token ? (JSON.parse(JSON.stringify(token)) as Token) : null;
  },

  refreshToken: () => {},

  refreshOauthToken: async (callback?: (value: string) => void) => {
    const token = await AuthService.getToken();

    if (!token) {
      return;
    }

    // TODO maybe throw error if no oauth token found
    removeOauthInterceptor();

    try {
      const { refresh_token } = token;
      const res: any = await ApiService.post("/auth/refresh-token", {
        refreshToken: refresh_token,
      });

      const { access_token } = res.data.data;

      setOauthRequestInterceptor(`Bearer ${access_token}`);
      await AuthService.setToken({
        ...token,
        access_token,
      });
      store.dispatch(
        setTokens({
          ...token,
          access_token,
        })
      );

      callback && callback(`Bearer ${access_token}`);
    } catch (e) {
      await clearT();

      throw e;
    }
  },
};

export default AuthService;
