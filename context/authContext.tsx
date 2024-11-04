import { useContext, createContext, useState, ReactNode } from "react";

export const AuthContext = createContext({
  token: "",
  userId: "",
  isAuthenticated: false,
  authenticate: (user: any) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const authenticate = async (user: any) => {
    const token = await user.getIdToken();
    setAuthToken(token);
    setUserId(user.uid);
  };

  const logout = () => {
    setAuthToken("");
  };

  const value = {
    token: authToken,
    userId: userId,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
