import { AxiosRequestConfig } from "axios";
import { Env } from "../../env";
import store from "../store/configureStore";
import { User } from "../types";
const { ApiUrl } = Env;

const globalRequestConfig: AxiosRequestConfig = {
  headers: {
    Accept: "application/json",
    ContentType: "application/json",
  },
};

export const combineUrls = (url: string): string => {
  return `${ApiUrl}${url}`;
};

export const combineConfig = (
  config: AxiosRequestConfig | undefined
): AxiosRequestConfig | undefined => {
  const { token } = store.getState().app;
  let customHeader = { ...config?.headers };
  if (token) {
    // @ts-ignore
    customHeader = {
      ...customHeader,
      Authorization: `Bearer ${token.access_token}`,
    };
  }
  return { ...globalRequestConfig, ...config, ...customHeader };
};

export const customRequests = {
  getUser: async (): Promise<any> => {
    const response = await fetch(`${ApiUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.getState().app.token?.access_token}`,
      },
    });
    return await response.json();
  },
  getNewAccessToken: async (): Promise<any> => {
    const response = await fetch(`${ApiUrl}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "content-Type": "application/JSON",
      },
      body: JSON.stringify({
        refreshToken: store.getState().app.token?.refresh_token,
      }),
    });
    return await response.json();
  },
};
