// frontend/src/pages/Login.tsx
import React, { useState } from 'react';
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';
// Importations des composants Shadcn UI
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      localStorage.setItem('access_token', response.access_token);
      toast.success('Login successful!', {
        description: 'Welcome back to XalimaFlow!',
      });
      navigate('/dashboard');
      
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Login failed. Please check your credentials.', {
        description: 'Please try again.',
      });       

    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="w-[380px] p-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Login to XalimaFlow</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
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
            <Button type="submit" className="w-full">Login</Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <Button variant="link" onClick={() => navigate('/register')} className="p-0 h-auto">
              Register
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;