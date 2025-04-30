import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import Cookies from 'universal-cookie';

import DeviceInfo from './components/DeviceInfo';

import { useState, useEffect } from "react";

import toast, { Toaster } from 'react-hot-toast';

const firebaseConfig = {
  apiKey: "AIzaSyCRwqTBMFzkeORuN91mkHL6cbXQrjekygE",
  authDomain: "ary-zap-5b32f.firebaseapp.com",
  databaseURL: "https://ary-zap-5b32f.firebaseio.com",
  projectId: "ary-zap-5b32f",
  storageBucket: "ary-zap-5b32f.appspot.com",
  messagingSenderId: "834097533516",
  appId: "1:834097533516:web:9a055f0fe8c599bcfd9ae9",
  measurementId: "G-NYWMQYX5ZY"
};

const cookies = new Cookies();

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();

const appleProvider = new firebase.auth.OAuthProvider('apple.com');


const saveUserToSession = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const getUserFromSession = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const removeUserFromSession = () => {
  localStorage.removeItem('user');
};

const signInWithApple = async (location) => {
  try {
    const res = await auth.signInWithPopup(appleProvider);
    const user = res.user;
    saveUserToSession(user);

    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      const d_info = DeviceInfo()
      const os = d_info.os.name + ' ' + d_info.os.version;
      await db.collection("users").add({
        uid: user.uid,
        name: null,
        authProvider: "apple",
        email: user.email,
        location,
        plan: 'free',
        phoneNumber: null,
        device:os,
        platform:"web"
      });
    }
    // window.location.assign('/');

  } catch (err) {    
      toast.error(err.message);
  }
};

const signInWithGoogle = async (location) => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = await res.user;
    saveUserToSession(user);
       

    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      const d_info = DeviceInfo()
      const os = d_info.os.name + ' ' + d_info.os.version;
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        location,
        email: user.email,
        plan: 'free',
        phoneNumber: null,
        device:os,
        platform:"web"
      });
    }else {
      const userDoc = query.docs[0]; // Assuming each UID is unique and only one document is returned
      if (!userDoc.data().name) {
        await db.collection("users").doc(userDoc.id).update({
          name: user.displayName
        });
      }
    }
    
    toast.success("Signed in");
    // await window.location.assign('/');
  } catch (err) {
    toast.error(err.message);
  }
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await auth.signInWithEmailAndPassword(email, password);
   
    const user = res.user;
    saveUserToSession(user);    
    // window.location.assign('/');

  } catch (err) {    
    toast.error(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password, location, phone, dob) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    // Wait for the profile update to complete
    await user.updateProfile({ displayName: name });
    saveUserToSession(user);

    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      
      const d_info = DeviceInfo()
      const os = d_info.os.name + ' ' + d_info.os.version;
      await db.collection("users").add({
        uid: user.uid,
        name,
        authProvider: "local",
        email,
        location,
        plan: 'free',
        dateOfBirth: dob,
        phoneNumber: phone,
        device:os,
        platform:"web"
      });
    }   
    window.location.reload();
    // window.location.assign('/');

  } catch (err) {
    toast.error(err.message);
  }
};

// const deleteaccount = async (name, email) => {
//   try {
   
//     const res = await auth.createUserWithEmailAndPassword(name, email);
//     const user = res.user;
//     await db.collection("deleted_users_requests").add({
//       uid: user.uid,
//       name,
//       email
//     });
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };



const deleteaccount = async () => {
  const user = firebase.auth().currentUser;

  try {
    // Get user document from Firestore
    const userDoc = await db.collection("users").where("uid", "==", user.uid).get();
    
    if (!userDoc.empty) {
      // Assuming there's only one user document with the given uid
      await db.collection("users").doc(userDoc.docs[0].id).delete();
    }

    // Delete user from Firebase Auth
    await user.delete();

    removeUserFromSession();
    auth.signOut();    
    toast.success('Account deleted successfully!');  
  } catch (err) {
    toast.error(err.message);
  }
};


const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    toast.success('Password reset link sent on your registered email!')
  } catch (err) {
    toast.error(err.message)
  }
};


const logout = async () => {
  try {
    await auth.signOut();
    removeUserFromSession();
    toast.success("Logged Out!");
    window.location.reload();
  } catch (error) {
    console.error(error);
    toast.error(error.message)
  }
};

const get_user_sessions = async () => {
  try { 
    const userUid = cookies.get('user_uid'); // Retrieve the UID from the cookie
    if (!userUid) {
      console.error("User UID is not found in cookies");
      return [];
    }

    // Retrieve the sessions and order by `loginTime` in desc order
    const userSessionsSnapshot = await db.collection("user_sessions")
    .where("uid", "==", userUid) // Querying by UID
    .orderBy("loginTime", "desc") // Ordering by loginTime
    .get();

    const userSessions = userSessionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return userSessions;
  } catch (err) {
    console.error("Error fetching user sessions:", err);
    return [];
  }
};

const remove_user_session = async (docID) => {
  try {
    // Reference the document by its unique ID and then delete it
    const docRef = db.collection("user_sessions").doc(docID);
    
    // Attempt to delete the document
    await docRef.delete();

    console.log(`Document with ID ${docID} deleted successfully`);
    return true; // Indicate successful deletion
  } catch (err) {
    console.error("Error deleting the user session:", err);
    return false; // Indicate failure to delete 
  }
};

const get_user_plan = async () => {
  try {
    const userUid = cookies.get('user_uid');
    if (!userUid) {
      console.error("User UID is not found in cookies");
      return null; 
    }

    const userSnapshot = await db.collection("users")
      .where("uid", "==", userUid) // Querying by UID
      .limit(1).get() 

    if (userSnapshot.empty) {
      console.warn("No user found with the given UID");
      return null;
    }
    const userDoc = userSnapshot.docs[0];
    const userPlan = userDoc.data().plan; // Retrieve only the 'plan' field

    return userPlan; // Return the plan

  } catch (err) {
    console.error("Error fetching user Plan:", err);
    return null; // Return null in case of error
  }
}

const get_account_details = async () => {
  try {
    const user = getUserFromSession();

    if (!user || !user.uid) {
      console.log("No user found in session or UID is missing");
      return null;
    }

    const userSnapshot = await db.collection("users")
      .where("uid", "==", user.uid) // Querying by UID
      .limit(1)
      .get();

    if (userSnapshot.empty) {
      console.log("No user found with the given UID");
      return null;
    }

    const userDoc = userSnapshot.docs[0];
    return userDoc.data(); // Returning the document data

  } catch (err) {
    console.error("Error fetching user details:", err);
    return null; // Return null in case of error
  }
};

const isAuthenticated = () => {
  return getUserFromSession() !== null;
};

const getUser = () => {
  
  return getUserFromSession();
};


const UpdateUserData = async (email, fullName, phone, dateOfBirth) => {
  try {
    const usersRef = db.collection("users");
    const querySnapshot = await usersRef.where("email", "==", email).get();

    if (querySnapshot.empty) {
      console.log("User with the specified email does not exist.");
      return false;
    }
    // Assume there is only one user with the given email
    const userDoc = querySnapshot.docs[0];
    const userRef = userDoc.ref;

   
    await userRef.update({
      name: fullName,
      phoneNumber: phone,
      dateOfBirth: dateOfBirth
    });
    return true
  } catch (error) {
    console.error("Error updating user details:", error);
    return false
  }
};



export {
  auth,
  db,
  signInWithGoogle,
  signInWithApple,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail, 
  logout,
  deleteaccount,
  get_user_sessions,
  remove_user_session,
  get_user_plan,
  isAuthenticated,
  getUser,
  get_account_details,
  UpdateUserData
};