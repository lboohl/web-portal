import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState('user');
  const loginAsAdmin = () => setRole('admin');
  const loginAsUser = () => setRole('user');
  return (
    <AuthContext.Provider value={{ role, loginAsAdmin, loginAsUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
