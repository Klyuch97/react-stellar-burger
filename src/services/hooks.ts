import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { AppDispatch, AppThunk, RootState } from '../types';

type TAppDispatch= {
  (): AppDispatch | AppThunk;
}

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch: TAppDispatch = dispatchHook;