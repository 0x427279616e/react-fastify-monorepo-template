import React, {
   createContext,
   useState,
   useContext,
   ReactNode,
   useEffect,
   useReducer,
} from 'react';
import { post } from '../services/api';
import jwtDecode from 'jwt-decode';

interface AuthContextType {
   isAuthenticated: boolean;
   login: (username?: string, password?: string) => Promise<void>;
   logout: () => void;
   user: User | null;
}

export interface User {
   id: string;
   username: string;
   full_name?: string;
   email?: string;
   role?: string;
   profile_picture?: string;
}

type AuthState = {
   isAuthenticated: boolean;
   user: User | null;
};

type AuthAction =
   | { type: 'LOGIN'; payload: User }
   | { type: 'LOGOUT' }
   | { type: 'INITIALIZE'; payload: User | null };

const authReducer = (
   state: AuthState,
   action: AuthAction,
): AuthState => {
   switch (action.type) {
      case 'LOGIN':
         return {
            ...state,
            isAuthenticated: true,
            user: action.payload,
         };
      case 'LOGOUT':
         return { ...state, isAuthenticated: false, user: null };
      case 'INITIALIZE':
         return {
            ...state,
            isAuthenticated: !!action.payload,
            user: action.payload,
         };
      default:
         return state;
   }
};

const initialState: AuthState = {
   isAuthenticated: false,
   user: null,
};

const validateToken = (token: string) => {
   if (!token) return false;
   try {
      const decoded = jwtDecode<{ exp: number }>(token);
      return decoded.exp > Date.now() / 1000;
   } catch {
      return false;
   }
};

const AuthContext = createContext<AuthContextType | undefined>(
   undefined,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
   children,
}) => {
   const [state, dispatch] = useReducer(authReducer, initialState);

   useEffect(() => {
      try {
         const token = window.localStorage.getItem('token');
         if (token && validateToken(token)) {
            const userData = window.localStorage.getItem('userInfo');
            if (userData) {
               dispatch({
                  type: 'INITIALIZE',
                  payload: JSON.parse(userData),
               });
               return;
            }
         }
      } catch {
         // ignore
      }
      dispatch({ type: 'INITIALIZE', payload: null });
   }, []);

   const login = async (username?: string, password?: string) => {
      const loginResponse = await post('auth/login', {
         username,
         password,
      });
      const logindata = loginResponse.data;
      const userData: User = {
         id: logindata.id,
         username: logindata.username,
         full_name: logindata.full_name,
         email: logindata.email,
         role: logindata.role,
         profile_picture: logindata.profile_picture,
      };
      localStorage.setItem('userInfo', JSON.stringify(userData));
      localStorage.setItem('token', logindata.token);
      dispatch({ type: 'LOGIN', payload: userData });
   };

   const logout = async () => {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
   };

   return (
      <AuthContext.Provider value={{ ...state, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context)
      throw new Error('useAuth must be used within an AuthProvider');
   return context;
};
