import { Link } from 'react-router-dom';

const Error404 = () => {
   return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-900 dark:to-gray-800">
         <div className="text-center">
            <h1 className="text-8xl font-bold text-gray-300 dark:text-gray-600">404</h1>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">Page not found</p>
            <Link to="/dashboard" className="btn btn-primary mt-6 inline-block">
               Go Home
            </Link>
         </div>
      </div>
   );
};

export default Error404;
