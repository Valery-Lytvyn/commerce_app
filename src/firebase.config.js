import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
   apiKey: "AIzaSyAn7VisTvwsAHIdUGUVMx0Pedt7mIS8a1o",
   authDomain: "shop-f0240.firebaseapp.com",
   projectId: "shop-f0240",
   storageBucket: "shop-f0240.appspot.com",
   messagingSenderId: "202475553106",
   appId: "1:202475553106:web:90685b90e3c1bef5453a8b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app