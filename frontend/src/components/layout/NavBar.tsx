// frontend/src/components/NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext'; // Pour vérifier l'état de connexion

const NavBar: React.FC = () => {
  const { user, logout } = useAuth(); // Récupère l'utilisateur et la fonction de déconnexion

  return (
    <header className="container mx-auto py-6 flex justify-between items-center z-20 relative">
      <Link to="/" className="flex items-center space-x-2 animate-in slide-in-from-left duration-700">
        <Sparkles className="h-7 w-7 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight text-foreground">XalimaFlow</h1>
      </Link>
      <nav className="space-x-4 animate-in slide-in-from-right duration-700">
        {user ? (
          <>
            <Link to="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Button onClick={logout} variant="outline">Logout</Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default NavBar;