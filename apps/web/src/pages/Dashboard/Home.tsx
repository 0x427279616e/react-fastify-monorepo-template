import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';

const Home = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setPageTitle('Dashboard'));
   }, [dispatch]);

   return (
      <div>
         <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white-light">
               Dashboard
            </h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="panel bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
               <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Welcome
               </h3>
               <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Your starter template is ready.
               </p>
            </div>
            <div className="panel bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
               <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Getting Started
               </h3>
               <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Add your pages under src/pages/.
               </p>
            </div>
            <div className="panel bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
               <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  API Ready
               </h3>
               <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Connected to API at /api prefix.
               </p>
            </div>
         </div>
      </div>
   );
};

export default Home;
