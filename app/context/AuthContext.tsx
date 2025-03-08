"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

interface UserData {
  uid: string;
  email: string | null;
  firstName: string;
  lastName: string;
  phone: string;
  airbnbListingUrl: string;
  address: string;
  zipCode: string;
  createdAt: any;
}

interface AuthContextType {
  user: UserData | null;
  authUser: User | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  authUser: null,
  loading: true,
  error: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setAuthUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              firstName: userData.firstName || '',
              lastName: userData.lastName || '',
              phone: userData.phone || '',
              airbnbListingUrl: userData.airbnbListingUrl || '',
              address: userData.address || '',
              zipCode: userData.zipCode || '',
              createdAt: userData.createdAt,
            });
          } else {
            console.error('No user data found in Firestore');
            setError('User profile not found');
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
          setError('Failed to load user profile');
        }
      } else {
        setUser(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    authUser,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 