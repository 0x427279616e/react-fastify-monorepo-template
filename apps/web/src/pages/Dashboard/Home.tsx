import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { Card, CardHeader, CardTitle, CardContent } from '@pikoloo/darwin-ui';

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
            <Card glass>
               <CardHeader>
                  <CardTitle>Welcome</CardTitle>
               </CardHeader>
               <CardContent>
                  <p className="text-gray-500 dark:text-gray-400">
                     Your starter template is ready.
                  </p>
               </CardContent>
            </Card>
            <Card glass>
               <CardHeader>
                  <CardTitle>Getting Started</CardTitle>
               </CardHeader>
               <CardContent>
                  <p className="text-gray-500 dark:text-gray-400">
                     Add your pages under <code className="text-primary">src/pages/</code>.
                  </p>
               </CardContent>
            </Card>
            <Card glass>
               <CardHeader>
                  <CardTitle>API Ready</CardTitle>
               </CardHeader>
               <CardContent>
                  <p className="text-gray-500 dark:text-gray-400">
                     Connected to API at <code className="text-primary">/api</code> prefix.
                  </p>
               </CardContent>
            </Card>
         </div>
      </div>
   );
};

export default Home;
