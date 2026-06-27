import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthProvider';

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
         <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800">
            <h1 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white">Sign In</h1>
            {error && (
               <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
                  {error}
               </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                  <label className="form-label">Username</label>
                  <input
                     type="text"
                     className="form-field"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     placeholder="Enter username"
                  />
               </div>
               <div>
                  <label className="form-label">Password</label>
                  <input
                     type="password"
                     className="form-field"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="Enter password"
                  />
               </div>
               <button type="submit" className="btn btn-primary w-full">
                  Sign In
               </button>
            </form>
         </div>
      </div>
   );
};

export default Login;
