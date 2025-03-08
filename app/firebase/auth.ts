import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  User
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';

// Type for user data
export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  airbnbListingUrl: string;
  address: string;
  zipCode: string;
}

// Register a new user
export const registerUser = async (
  email: string, 
  password: string, 
  userData: UserData
): Promise<User> => {
  try {
    // Debug log to check user data before registration
    console.log('Registering user with data:', userData);
    
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update profile with display name
    await updateProfile(user, {
      displayName: `${userData.firstName} ${userData.lastName}`
    });
    
    // Prepare user data for Firestore
    const userDataForFirestore = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      airbnbListingUrl: userData.airbnbListingUrl,
      address: userData.address, // Ensure address is included
      zipCode: userData.zipCode,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    // Debug log to check data being saved to Firestore
    console.log('Saving user data to Firestore:', userDataForFirestore);
    
    // Store additional user data in Firestore
    await setDoc(doc(db, 'users', user.uid), userDataForFirestore);
    
    return user;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Sign in existing user
export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

// Sign out user
export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Reset password
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
}; 