import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { AppDispatch, AppThunk, RootState } from '../types';

interface IAppDispatch {
  (): AppDispatch | AppThunk;
}

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch: IAppDispatch = dispatchHook;