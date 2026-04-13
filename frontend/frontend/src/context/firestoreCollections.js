import { collection } from 'firebase/firestore';
import { db } from './firebase';

// Collection references as defined in README.md
export const usersRef = collection(db, 'users');
export const productsRef = collection(db, 'products');
export const ordersRef = collection(db, 'orders');
export const cartRef = collection(db, 'cart');
export const reelsRef = collection(db, 'reels');
export const feedbackVideosRef = collection(db, 'feedbackVideos');
export const certificatesRef = collection(db, 'certificates');
export const couponsRef = collection(db, 'coupons');
export const schemesRef = collection(db, 'schemes');
