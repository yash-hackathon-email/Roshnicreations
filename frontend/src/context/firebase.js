// Re-export from the single Firebase instance to avoid duplicate initialization
export { auth, db, storage, googleProvider, default } from '../utils/firebase';
