const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user_model');

// אתחול הקליינט של גוגל עם ה-ID מהסביבה שלנו
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
};

const createRefreshToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
};

// הרשמה
// הרשמה
const register = async (req, res) => {
  try {
    // הוספנו את ה-photo לשליפה מהבקשה (שורה 4)
    const { name, email, password, role, photo } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters long'
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: 'Email already exists'
      });
    }

    // הוספנו את ה-photo ליצירת המשתמש במסד הנתונים
    const user = await User.create({
      name,
      email,
      password,
      role,
      photo
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// התחברות
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// התחברות באמצעות גוגל
const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ message: 'Google token is required' });
    }

    // 1. אימות הטוקן מול השרתים של גוגל
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    // 2. חיפוש המשתמש במסד הנתונים
    let user = await User.findOne({ email });

    // 3. אם הוא לא קיים, ניצור אותו (הרשמה אוטומטית)
    if (!user) {
      user = await User.create({
        name: name,
        email: email,
        // ממציאים סיסמה אקראית מאחר שהוא לעולם לא ישתמש בה להתחברות רגילה
        password: Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10),
        role: 'owner' // ברירת מחדל
      });
    }

    // 4. יצירת הטוקנים של המערכת שלנו (בדיוק כמו בהתחברות רגילה)
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    // 5. שליחת התשובה לפרונט-אנד
    res.status(200).json({
      message: 'Google login successful',
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Google Auth Error:', err);
    res.status(500).json({ message: 'Failed to authenticate with Google' });
  }
};

module.exports = {
  register,
  login,
  googleLogin
};