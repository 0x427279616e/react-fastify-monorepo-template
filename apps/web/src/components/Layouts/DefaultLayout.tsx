import { PropsWithChildren, Suspense } from 'react';
import App from '../../App';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

const DefaultLayout = ({ children }: PropsWithChildren) => {
   return (
      <App>
         <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 min-w-0">
               <Header />
               <main className="flex-1 overflow-y-auto">
                  <Suspense>
                     <div className="md:py-5 md:px-3">{children}</div>
                  </Suspense>
                  <Footer />
               </main>
            </div>
         </div>
      </App>
   );
};

export default DefaultLayout;
