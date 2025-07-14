// frontend/src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import * as authService from '../services/auth'; // Importez toutes les fonctions du service auth

// Interface pour le payload du jeton JWT
interface JWTPayload {
  sub: string;
  user_id: number;
  exp: number;
  iat: number;
}

// Interface pour l'utilisateur authentifié
interface AuthUser {
  email: string;
  id: number;
}

// Interface pour le contexte d'authentification
interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>; // <--- NOUVEAU: Fonction register
  logout: () => void;
  isLoadingAuth: boolean;
}

// Créez le contexte avec une valeur par défaut
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fournisseur d'authentification
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const loadUserFromToken = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error("Failed to load current user or token expired/invalid:", error);
          authService.logout();
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoadingAuth(false);
    };

    loadUserFromToken();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoadingAuth(true);
    try {
      const response = await authService.login(email, password);
      localStorage.setItem('access_token', response.access_token);
      
      const decoded = jwtDecode<JWTPayload>(response.access_token);
      setUser({ email: decoded.sub, id: decoded.user_id });

    } catch (error) {
      console.error("Login failed:", error);
      authService.logout();
      setUser(null);
      throw error;
    } finally {
      setIsLoadingAuth(false);
    }
  };

  // <--- NOUVELLE FONCTION: register
  const register = async (email: string, password: string) => {
    setIsLoadingAuth(true); // Peut-être pas nécessaire pour register si pas de redirection auto
    try {
      await authService.register(email, password);
      // Après une inscription réussie, on ne connecte pas automatiquement l'utilisateur.
      // Il doit se connecter via la page de login.
    } catch (error) {
      console.error("Registration failed:", error);
      throw error; // Propager l'erreur
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoadingAuth }}> {/* <--- AJOUTEZ register ici */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};