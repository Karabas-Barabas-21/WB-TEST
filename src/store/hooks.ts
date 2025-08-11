import { 
  useDispatch, 
  useSelector,
  useStore,
  
} from 'react-redux';
import type { 
  RootState, 
  AppDispatch,
  AppStore 
} from './store';

// 1. Типизированные хуки (более безопасная версия)
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

// 2. Кастомные хуки с обработкой ошибок
export const useUsers = () => {
  const users = useAppSelector(state => state.users);
  
  if (!users) {
    throw new Error(
      'Users slice is not initialized. Check your store configuration.'
    );
  }
  
  return users;
};

// 3. Дополнительные типы для удобства
export type { RootState, AppDispatch, AppStore };