import { User, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { Navigate } from "react-router-dom";

interface IAuthContext {
  currenrUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
}

const AuthContext = createContext<IAuthContext>(null!);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currenrUser, setCurrenrUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const initializeUser = (user: User | null) => {
    if (user) {
      setCurrenrUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrenrUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  };

  const value = {
    currenrUser,
    userLoggedIn,
    loading,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && !userLoggedIn && <Navigate to={"/login"} replace={true} />}
      {loading && <p>loading...</p>}
      {!loading && children}
    </AuthContext.Provider>
  );
}
