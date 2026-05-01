import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const token = sessionStorage.getItem('token');
      const name  = sessionStorage.getItem('name');
      return token ? { token, name } : null;
    } catch {
      return null;
    }
  });

  const login = (token, name) => {
    try {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('name', name);
    } catch {}
    setUser({ token, name });
  };

  const logout = () => {
    try {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('name');
    } catch {}
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}