import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar as DarwinSidebar } from '@pikoloo/darwin-ui';
import { LayoutDashboard, LogIn } from 'lucide-react';
import { useAuth } from '../../utils/AuthProvider';

const Sidebar = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const { logout } = useAuth();

   const items = [
      { label: 'Dashboard', onClick: () => navigate('/dashboard'), icon: LayoutDashboard },
      { label: 'Login', onClick: () => navigate('/login'), icon: LogIn },
   ];

   const activeItem = location.pathname === '/dashboard' ? 'Dashboard'
      : location.pathname === '/login' ? 'Login' : '';

   return (
      <DarwinSidebar
         items={items}
         activeItem={activeItem}
         onLogout={() => { logout(); navigate('/login'); }}
         collapsible
         glass
      />
   );
};

export default Sidebar;
