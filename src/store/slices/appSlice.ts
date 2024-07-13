import { ScheduleWorkout } from "./../../types/schedule-workout";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { LANGUAGES, Token, Trainer, User } from "../../types";

export type AppState = {
  language: LANGUAGES;
  token?: Token;
  user?: User;
  trainer?: Trainer;
};

const initialState: AppState = {
  language: LANGUAGES.RU,
};

const {
  actions: {
    setLanguage,
    setTokens,
    setAccessToken,
    setRefreshToken,
    clearTokens,
    setUser,
    clearUser,
    clearAppState,
    setTrainer,
  },
  reducer,
} = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LANGUAGES>) => {
      return {
        ...state,
        language: action.payload,
      };
    },

    setTokens: (state, action: PayloadAction<Token>) => {
      return {
        ...state,
        token: action.payload,
      };
    },

    setAccessToken: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        token: {
          refresh_token: state.token?.refresh_token || "",
          access_token: action.payload,
        },
      };
    },

    setRefreshToken: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        token: {
          access_token: state.token?.access_token || "",
          refresh_token: action.payload,
        },
      };
    },

    clearTokens: (state) => {
      return {
        ...state,
        token: undefined,
      };
    },

    setUser: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        user: action.payload,
      };
    },

    clearUser: (state) => {
      return {
        ...state,
        user: undefined,
      };
    },

    clearAppState: () => {
      return {
        ...initialState,
      };
    },
    setTrainer: (state, action: PayloadAction<Trainer>) => {
      return { ...state, trainer: action.payload };
    },
  },
});

export {
  setLanguage,
  setTokens,
  setAccessToken,
  setRefreshToken,
  clearTokens,
  setUser,
  clearUser,
  clearAppState,
  setTrainer,
};

export const selectLanguage = ({ app: { language } }: RootState) => language;

export const selectToken = ({ app: { token } }: RootState) => token;

export const selectUser = ({ app: { user } }: RootState) => user;

export const selectTrainer = ({ app: { trainer } }: RootState) => trainer;

export const selectScheduleWorkouts = ({ app: { user } }: RootState) =>
  user?.scheduleWorkouts;

export const selectSchemaNutritions = ({ app: { user } }: RootState) =>
  user?.schemaNutritions;

export const selectMeasurements = ({ app: { user } }: RootState) =>
  user?.myMeasurements;

export default reducer;
