import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthProvider';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, Button, Input, Alert } from '@pikoloo/darwin-ui';

const Login = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const { login } = useAuth();
   const navigate = useNavigate();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         await login(username, password);
         navigate('/dashboard');
      } catch (err) {
         setError('Invalid credentials');
      }
   };

   return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-900 dark:to-gray-800">
         <Card glass className="w-full max-w-md">
            <CardHeader>
               <CardTitle>Sign In</CardTitle>
            </CardHeader>
            <CardContent>
               {error && (
                  <Alert variant="destructive" title="Error" description={error} className="mb-4" />
               )}
               <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                     variant="text"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     placeholder="Username"
                     className="w-full"
                  />
                  <Input
                     variant="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="Password"
                     className="w-full"
                  />
                  <Button type="submit" variant="primary" fullWidth>
                     Sign In
                  </Button>
               </form>
            </CardContent>
         </Card>
      </div>
   );
};

export default Login;
