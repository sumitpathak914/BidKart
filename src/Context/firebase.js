// import { Capacitor } from '@capacitor/core';
// import { FirebaseMessaging } from '@capacitor-firebase/messaging';
// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//     apiKey: "AIzaSyDEvVZFvpwu00aiXJtJgc4RRIkB6ZhK3Lc",
//     authDomain: "bidkart-81087.firebaseapp.com",
//     projectId: "bidkart-81087",
//     storageBucket: "bidkart-81087.firebasestorage.app",
//     messagingSenderId: "31821399334",
//     appId: "1:31821399334:android:f0b7cf1ccb5ff40223ade7"
// };

// const app = initializeApp(firebaseConfig);

// // ✅ FCM Token मिळवणे (फक्त Android साठी)
// export const getDeviceToken = async () => {
//     try {
//         if (Capacitor.isNativePlatform()) {
//             // Permission मागा
//             const permission = await FirebaseMessaging.requestPermissions();
//             console.log("Permission status:", permission.receive);

//             if (permission.receive === 'granted') {
//                 // Token मिळवा
//                 const { token } = await FirebaseMessaging.getToken();
//                 console.log("✅ Android FCM Token मिळाला:", token);
//                 return token;
//             } else {
//                 console.warn("Notification permission denied");
//                 return null;
//             }
//         } else {
//             return null; // Web साठी नको
//         }
//     } catch (error) {
//         console.error("Error getting FCM token:", error);
//         return null;
//     }
// };

// // ✅ Foreground मध्ये Notification ऐकणे
// export const onMessageListener = () =>
//     new Promise((resolve) => {
//         if (Capacitor.isNativePlatform()) {
//             FirebaseMessaging.addListener('messageReceived', (notification) => {
//                 console.log('Notification received in foreground', notification);
//                 resolve(notification);
//             });
//         } else {
//             resolve(null);
//         }
//     });

// // ✅ App सुरू होताना Initialize करणे
// export const initNotifications = async () => {
//     if (Capacitor.isNativePlatform()) {
//         await FirebaseMessaging.requestPermissions();
//         await FirebaseMessaging.getToken(); // Token generate होण्यासाठी
//     }
// };


// firebase.js
import { Capacitor } from '@capacitor/core';
import { FirebaseMessaging } from '@capacitor-firebase/messaging';

// ✅ FCM Token मिळवणे
export const getDeviceToken = async () => {
    try {
        if (Capacitor.isNativePlatform()) {
            // 1. Permission मागा
            const permission = await FirebaseMessaging.requestPermissions();
            console.log("Permission status:", permission.receive);

            if (permission.receive === 'granted') {
                // 2. Token मिळवा
                const { token } = await FirebaseMessaging.getToken();
                console.log("✅ Android FCM Token मिळाला:", token);
                return token;
            } else {
                console.warn("Notification permission denied");
                return null;
            }
        } else {
            return null; // Web साठी नको
        }
    } catch (error) {
        console.error("Error getting FCM token:", error);
        return null;
    }
};

// ✅ Foreground मध्ये Notification ऐकणे
export const onMessageListener = () =>
    new Promise((resolve) => {
        if (Capacitor.isNativePlatform()) {
            FirebaseMessaging.addListener('messageReceived', (notification) => {
                console.log('Notification received in foreground', notification);
                resolve(notification);
            });
        } else {
            resolve(null);
        }
    });

// ✅ App सुरू होताना Initialize करणे
export const initNotifications = async () => {
    if (Capacitor.isNativePlatform()) {
        await FirebaseMessaging.requestPermissions();
        await FirebaseMessaging.getToken(); // Token generate होण्यासाठी
    }
};