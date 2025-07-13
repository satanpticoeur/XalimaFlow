import React, { useEffect, useState } from 'react';
import { getCurrentUser, logout } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface UserData {
  email: string;
  id: number;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error: any) {
        toast.error(error.response?.data?.detail || 'Failed to fetch user data.', {
          description: 'Please log in again.',
        });
        logout();
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]); // Removed toast from dependency array as it might cause re-renders if not stable

  const handleLogout = () => {
    logout();
    toast.success('You have been logged out successfully.', {
      description: 'See you next time!',
    });
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p> 
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>You are not logged in. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="w-[800px] p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Welcome to your XalimaFlow Dashboard, {user.email}!</CardTitle>
          <CardDescription className="mt-2 text-lg">This is your private space to create amazing content.</CardDescription>
        </CardHeader>
        <CardContent className="mt-6 text-center">
          <Button onClick={handleLogout} variant="destructive">Logout</Button>
          {/* Ici, nous pourrons ajouter les fonctionnalités de création de contenu */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;