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


export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();


export const useUsers = () => {
  const users = useAppSelector(state => state.users);
  
  if (!users) {
    throw new Error(
      'Users slice is not initialized. Check your store configuration.'
    );
  }
  
  return users;
};


export type { RootState, AppDispatch, AppStore };