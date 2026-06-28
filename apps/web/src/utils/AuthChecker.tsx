import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

interface AuthCheckerProps {
    children?: React.ReactNode;
}

const AuthChecker: React.FC<AuthCheckerProps> = ({ children }) => {
    const { isAuthenticated, user } = useAuth();
    const [checkedAuth, setCheckedAuth] = useState(false);

    useEffect(() => {
        // This effect will run whenever isAuthenticated or user changes
        if (isAuthenticated && user) {
            setCheckedAuth(true);
        } else {
            setCheckedAuth(true);
        }
    }, [isAuthenticated, user]);

    if (!checkedAuth) {
        // You can return a loading spinner or null here
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <>{children || <Outlet />}</>;
};

export default AuthChecker;