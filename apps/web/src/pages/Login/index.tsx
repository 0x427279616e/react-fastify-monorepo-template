import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthProvider';
import { Input, Button, Card } from '@pikoloo/darwin-ui';

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
      <Card className="flex min-h-screen items-center justify-center ">
         <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800">
            <h1 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white"></h1>
            {error && (
               <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
                  {error}
               </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                  <label className="">Username</label>
                  <Input
                     type="text"
                     className="form-field"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     placeholder="Enter username"
                  />
               </div>
               <div>
                  <label className="">Password</label>
                  <Input
                     type="password"
                     className="form-field"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="Enter password"
                  />
               </div>
               <Button type="submit" variant="primary" className=" w-full">
                  Sign In
               </Button>
            </form>
         </div>
      </Card>
   );
};

export default Login;
