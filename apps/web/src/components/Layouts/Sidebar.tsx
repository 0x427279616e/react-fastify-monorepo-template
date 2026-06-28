import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar as DarwinSidebar } from '@pikoloo/darwin-ui';
import { User, UserPlus } from 'lucide-react';
import { useAuth } from '../../utils/AuthProvider';

const Sidebar = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const { logout } = useAuth();

   const items = [
      { label: 'Personal Info', onClick: () => navigate('/personal-info'), icon: User },
      { label: 'Add Personal Info', onClick: () => navigate('/personal-info/form'), icon: UserPlus },
   ];

   const activeItem = location.pathname === '/personal-info' ? 'Personal Info'
      : location.pathname === '/personal-info/form' ? 'Add Personal Info' : '';

   return (
      <DarwinSidebar
         items={items}
         activeItem={activeItem}
         onLogout={() => { logout(); navigate('/'); }}
         collapsible
         glass
      />
   );
};

export default Sidebar;
