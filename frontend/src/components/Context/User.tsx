import React, { ReactNode, createContext, useContext, useState } from 'react';
import { Destination, User } from '../Interfaces/Interface';

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  destination: Destination[] | null;
  setDestination: React.Dispatch<React.SetStateAction<Destination[] | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [destination, setDestination] = useState<Destination[] | null>([])
  return (
    <UserContext.Provider value={{ user, setUser, destination, setDestination }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within an UserProvider');
  }
  return context;
};