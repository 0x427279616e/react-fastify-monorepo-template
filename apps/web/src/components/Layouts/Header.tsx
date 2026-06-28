import { useNavigate } from 'react-router-dom';
import { Topbar } from '@pikoloo/darwin-ui';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../utils/AuthProvider';

const Header = () => {
   const navigate = useNavigate();
   const { user, logout } = useAuth();

   return (
      <Topbar
         items={[]}
         logo={<span className="text-lg font-bold">Template</span>}
         actions={
            <button
               onClick={() => { logout(); navigate('/login'); }}
               className="flex items-center gap-2 px-3 py-1.5 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
            >
               <LogOut className="h-4 w-4" />
               Sign Out
            </button>
         }
         sticky
         glass
      />
   );
};

export default Header;
