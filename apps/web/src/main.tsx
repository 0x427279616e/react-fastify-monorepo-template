import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './tailwind.css';
import './i18n';
import {
   OverlayProvider,
   ToastProvider,
   AlertProvider,
   TooltipProvider,
} from '@pikoloo/darwin-ui';
import { RouterProvider } from 'react-router-dom';
import router from './router/index';
import { Provider } from 'react-redux';
import store from './store/index';
import { AuthProvider } from './utils/AuthProvider';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <OverlayProvider>
      <ToastProvider>
         <AlertProvider>
            <TooltipProvider>
               <QueryClientProvider client={queryClient}>
                  <AuthProvider>
                     <Suspense fallback={null}>
                        <Provider store={store}>
                           <RouterProvider router={router} />
                        </Provider>
                     </Suspense>
                  </AuthProvider>
               </QueryClientProvider>
            </TooltipProvider>
         </AlertProvider>
      </ToastProvider>
   </OverlayProvider>,
);
