// frontend/src/pages/Login.tsx
import React, { useState } from 'react';
// import { login } from '../services/auth'; // <--- REMOVE THIS IMPORT
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner'; // Keep sonner toast for UI feedback
import { useAuth } from '../contexts/AuthContext'; // <--- NEW: Import useAuth

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const { login: authContextLogin } = useAuth(); // <--- Use the login function from AuthContext

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true
    try {
      // Call the login function from AuthContext
      await authContextLogin(email, password); 
      
      // The AuthContext will handle localStorage.setItem and setting the user state.
      // The ProtectedRoute will handle the navigation to /dashboard once the user state is set.
      toast.success('Login successful!', {
        description: 'Welcome back to XalimaFlow!',
      });
      navigate('/dashboard'); 

    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Login failed. Please check your credentials.', {
        description: 'Please try again.',
      });       
    } finally {
      setIsLoading(false); // Reset loading
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'} {/* Use loading state */}
            </Button>
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