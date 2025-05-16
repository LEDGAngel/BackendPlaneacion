import { db } from '../utils/firebase.js';
import crypto from "crypto";
import jwt from "jsonwebtoken";

const usersCollection = db.collection('users'); // Define the Firestore collection name for users

export const login = async (req, res) => {
  try {
    const snapshot = await usersCollection.where('username', '==', req.body.username).limit(1).get();

    if (snapshot.empty) {
      return res.status(400).json({ isLogin: false, user: {}, message: 'Invalid credentials' });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();
    const salt = userData.password.slice(0, 12);
    const newMsg = salt + req.body.password;
    const hashing = crypto.createHash("sha512");
    const hash = hashing.update(newMsg).digest("base64url");
    const realpassword = salt + hash;

    const isLogin = userData.password === realpassword;

    if (isLogin) {
      const token = jwt.sign({ sub: userDoc.id }, process.env.JWT, { expiresIn: '1h' });
      res.status(200).json({ isLogin: isLogin, user: { id: userDoc.id, ...userData }, token: token });
    } else {
      res.status(400).json({ isLogin: isLogin, user: {}, message: 'Invalid password' });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: 'Failed to login' });
  }
};

export const register = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    // Check if the username already exists
    const existingUserSnapshot = await usersCollection.where('username', '==', username).get();
    if (!existingUserSnapshot.empty) {
      return res.status(409).json({ operation: false, message: 'Username already exists' });
    }

    const salt = crypto.randomBytes(16).toString('base64url').slice(0, 12);
    const newMsg = salt + password;
    const hashing = crypto.createHash("sha512");
    const hash = hashing.update(newMsg).digest("base64url");
    const realpassword = salt + hash;

    const newUser = {
      name: name,
      username: username,
      password: realpassword
    };

    const docRef = await usersCollection.add(newUser);
    const userSnapshot = await docRef.get();
    const registeredUser = { id: userSnapshot.id, ...userSnapshot.data() };

    res.status(200).json({ operation: true, item: [registeredUser] });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ operation: false, error: 'Failed to register user' });
  }
};

export const putlogin = async (req, res) => {
  try {
    const { username } = req.body;
    const { password } = req.params;

    const salt = crypto.randomBytes(16).toString('base64url').slice(0, 12);
    const newMsg = salt + password;
    const hashing = crypto.createHash("sha512");
    const hash = hashing.update(newMsg).digest("base64url");
    const realpassword = salt + hash;

    const snapshot = await usersCollection.where('username', '==', username).limit(1).get();

    if (snapshot.empty) {
      return res.status(404).json({ operation: false, message: 'User not found' });
    }

    const userDoc = snapshot.docs[0].ref;
    await userDoc.update({ password: realpassword });

    const updatedUserSnapshot = await userDoc.get();
    const updatedUserData = { id: updatedUserSnapshot.id, ...updatedUserSnapshot.data() };

    res.status(200).json({ operation: true, item: [updatedUserData] });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ operation: false, error: 'Failed to update password' });
  }
};