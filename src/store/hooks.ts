import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './types';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// Variant 2:
// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// Теперь этот хук знает структуру хранилища
