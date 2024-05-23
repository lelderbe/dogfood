import { createContext } from 'react';

export const UserContext = createContext<IUser | null>(null);

UserContext.displayName = 'UserContext';
