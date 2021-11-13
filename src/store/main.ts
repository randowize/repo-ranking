import { configureStore } from "@reduxjs/toolkit";
import language from "@features/language";
import repos from "@features/repos";

export const store = configureStore({
  reducer: { language, repos },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
