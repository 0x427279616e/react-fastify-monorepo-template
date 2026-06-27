import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar, toggleTheme } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';
import { useEffect, useState } from 'react';
import { LayoutDashboard, LogIn } from 'lucide-react';
import { useAuth } from '../../utils/AuthProvider';

const Sidebar = () => {
   const themeConfig = useSelector((state: IRootState) => state.themeConfig);
   const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
   const location = useLocation();
   const dispatch = useDispatch();
   const { t } = useTranslation();

   useEffect(() => {
      if (window.innerWidth < 1024 && themeConfig.sidebar) {
         dispatch(toggleSidebar());
      }
   }, [location, dispatch, themeConfig.sidebar]);

   return (
      <div className={semidark ? 'dark' : ''}>
         <nav className="sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300">
            <div className="bg-white dark:bg-[#0D1C35] backdrop-blur-sm h-full flex flex-col">
               <div className="flex justify-center items-center py-6">
                  <h1 className="text-xl font-bold text-gray-800 dark:text-white">Template</h1>
               </div>
               <PerfectScrollbar className="flex-grow relative">
                  <ul className="relative font-medium space-y-0.5 px-4">
                     <li className="nav-item">
                        <NavLink to="/dashboard" className="group">
                           <div className="flex items-center gap-3">
                              <LayoutDashboard className="icon" size={20} />
                              <span className="text-sm">Dashboard</span>
                           </div>
                        </NavLink>
                     </li>
                     <li className="nav-item">
                        <NavLink to="/login" className="group">
                           <div className="flex items-center gap-3">
                              <LogIn className="icon" size={20} />
                              <span className="text-sm">Login</span>
                           </div>
                        </NavLink>
                     </li>
                  </ul>
               </PerfectScrollbar>
            </div>
         </nav>
      </div>
   );
};

export default Sidebar;
