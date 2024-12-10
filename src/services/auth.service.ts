import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, isFirebaseInitialized } from '../config/firebase';

export interface CreateAccountData {
  fullName: string;
  email: string;
  password: string;
  boatName?: string;
}

export class AuthService {
  async createAccount(data: CreateAccountData): Promise<UserCredential> {
    if (!isFirebaseInitialized()) {
      throw new Error('Firebase is not properly initialized');
    }

    try {
      // Create the user account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Update profile with full name
      await updateProfile(userCredential.user, {
        displayName: data.fullName
      });

      // Store additional user data in Firestore
      const userDoc = doc(db, 'users', userCredential.user.uid);
      await setDoc(userDoc, {
        fullName: data.fullName,
        email: data.email,
        boatName: data.boatName || null,
        createdAt: new Date().toISOString()
      });

      return userCredential;
    } catch (error: any) {
      console.error('Account creation error:', error);
      
      // Handle specific Firebase error codes
      switch (error.code) {
        case 'auth/email-already-in-use':
          throw new Error('This email is already registered. Please try logging in instead.');
        case 'auth/invalid-email':
          throw new Error('Please enter a valid email address.');
        case 'auth/operation-not-allowed':
          throw new Error('Account creation is currently disabled.');
        case 'auth/weak-password':
          throw new Error('Please choose a stronger password.');
        case 'auth/network-request-failed':
          throw new Error('Network error. Please check your internet connection.');
        default:
          throw new Error('Failed to create account. Please try again.');
      }
    }
  }

  async login(email: string, password: string): Promise<UserCredential> {
    if (!isFirebaseInitialized()) {
      throw new Error('Firebase is not properly initialized');
    }

    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('Login error:', error);
      
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          throw new Error('Invalid email or password.');
        case 'auth/user-disabled':
          throw new Error('This account has been disabled.');
        case 'auth/too-many-requests':
          throw new Error('Too many failed attempts. Please try again later.');
        case 'auth/network-request-failed':
          throw new Error('Network error. Please check your internet connection.');
        default:
          throw new Error('Failed to log in. Please try again.');
      }
    }
  }

  async logout(): Promise<void> {
    if (!isFirebaseInitialized()) {
      throw new Error('Firebase is not properly initialized');
    }

    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Failed to log out. Please try again.');
    }
  }
}