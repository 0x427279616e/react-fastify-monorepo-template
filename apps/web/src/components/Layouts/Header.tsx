import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { IRootState } from '../../store';
import { useAuth } from '../../utils/AuthProvider';
import { LogOut, User2 } from 'lucide-react';
import Dropdown from '../Dropdown';

const Header = () => {
   const location = useLocation();
   const { user, logout } = useAuth();
   const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
   const themeConfig = useSelector((state: IRootState) => state.themeConfig);
   const navigate = useNavigate();

   const LogoutUser = async () => {
      logout();
      navigate('/login');
   };

   return (
      <header className={`z-20 ${themeConfig.semidark ? 'dark' : ''}`}>
         <div className="background-color-primary flex w-full items-center px-5 py-3 justify-end">
            <div className="dropdown shrink-0 flex text-dark">
               <Dropdown
                  offset={[0, 8]}
                  placement={isRtl ? 'bottom-start' : 'bottom-end'}
                  btnClassName="relative group block rounded-2xl focus:outline-none"
                  button={
                     <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/90 text-slate-700 shadow-lg">
                        <User2 className="h-5 w-5" />
                     </div>
                  }
               >
                  <div className="w-48 rounded-lg border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900 p-2">
                     <button
                        onClick={LogoutUser}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                     >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                     </button>
                  </div>
               </Dropdown>
            </div>
         </div>
      </header>
   );
};

export default Header;
