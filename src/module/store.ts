import { createContext } from 'react';
import { GlobalContext } from './type';

export const Store = createContext<GlobalContext>(undefined);
