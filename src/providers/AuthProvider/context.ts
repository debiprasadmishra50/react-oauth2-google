// libs
import { createContext, useContext } from 'react';
import { AUTHENTICATION } from './constants';

interface AuthContext {
  login?: (body: any) => Promise<boolean>;
  googleLogin?: (body: any) => {};
  logout?: () => Promise<void>;
  signup?: (body: any) => Promise<boolean>;
  forgotPassword?: (body: any) => Promise<boolean>;
  resetPassword?: (body: any) => {};
  activate?: (token: string) => {};
  authStatus: AUTHENTICATION;
  isSeller: (user?: any) => boolean;
  setAppAuthStatus?: (status: AUTHENTICATION) => void;
  isAccountActive: () => boolean;
  isLoading: boolean;
  verifyToken?: (token: string) => Promise<void>;
}

const initialValue: AuthContext = {
  authStatus: AUTHENTICATION.NOT_DETERMINED,
  isSeller: () => false,
  isAccountActive: () => false,
  isLoading: false,
};

const authContext = createContext(initialValue);

export const useAuthContext = () => useContext(authContext);

export default authContext;
