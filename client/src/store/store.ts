import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import contentSlice from './counter/contentSlice';
import popupsSlice from './counter/popupsSlice';
import userSlice from './counter/userSlice';


export const store = configureStore({
  reducer: { userSlice, popupsSlice, contentSlice },
});


export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();