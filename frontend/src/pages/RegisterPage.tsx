// frontend/src/pages/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext'; // <--- NOUVEAU: Importez useAuth

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register: authContextRegister } = useAuth(); // <--- Utilisez la fonction register du contexte

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authContextRegister(email, password); // <--- Appel à la fonction register du contexte
      toast.success('Registration successful! You can now log in.', {
        description: 'Welcome to XalimaFlow!',
      });
      navigate('/login'); // Redirige vers la page de login après une inscription réussie
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'An error occurred during registration.', {
        description: 'Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="w-[380px] p-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Register for XalimaFlow</CardTitle>
          <CardDescription>Create your account to start creating content.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Button variant="link" onClick={() => navigate('/login')} className="p-0 h-auto">
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;