import React, { createContext, useContext, useState, ReactNode } from "react";

export interface UserProfile {
  name: string;
  age: number;
  gender: string;
  country: string;
  photoUrl: string | null;
}

interface AuthContextType {
  isLoggedIn: boolean;
  isProfileComplete: boolean;
  user: { email: string } | null;
  profile: UserProfile | null;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => boolean;
  logout: () => void;
  setProfile: (profile: UserProfile) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [profile, setProfileState] = useState<UserProfile | null>(null);

  const login = (email: string, _password: string) => {
    setIsLoggedIn(true);
    setUser({ email });
    return true;
  };

  const signup = (email: string, _password: string) => {
    setIsLoggedIn(true);
    setUser({ email });
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setProfileState(null);
  };

  const setProfile = (p: UserProfile) => {
    setProfileState(p);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isProfileComplete: !!profile,
        user,
        profile,
        login,
        signup,
        logout,
        setProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
