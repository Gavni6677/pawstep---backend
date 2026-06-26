const express = require("express");
const router = express.Router();
const multer = require("multer");

// הגדרת תצורת השמירה של multer [cite: 42]
const storage = multer.diskStorage({
  // לאן לשמור את הקובץ - תיקיית public [cite: 43, 44]
  destination: function (req, file, cb) {
    cb(null, 'public/')
  },
  // באיזה שם לשמור את הקובץ [cite: 46]
  filename: function (req, file, cb) {
    // חילוץ סיומת הקובץ המקורית (כמו .jpg או .png) [cite: 47, 48, 49]
    const ext = file.originalname.split('.').filter(Boolean).slice(1).join('.');
    // יצירת שם ייחודי מבוסס על חותמת הזמן הנוכחית כדי למנוע דריסת קבצים [cite: 50]
    cb(null, Date.now() + "." + ext);
  }
});

// יצירת המידלוור של ההעלאה [cite: 53]
const upload = multer({ storage: storage });

// נתיב POST לקבלת קובץ בודד בשדה שנקרא "file" [cite: 54]
router.post('/', upload.single("file"), function (req, res) {
  // הרכבת כתובת ה-URL הבסיסית של השרת
  // (במקום לשים משתני סביבה כמו במצגת, השתמשתי פה בדרך דינמית ששואבת את הכתובת ישירות מהבקשה)
  const base = req.protocol + "://" + req.get('host') + "/";
  
  // בווינדוס נתיבים כוללים לפעמים לוכסן הפוך (\), הקוד הזה ממיר אותם ללוכסן רגיל (/) כדי שהקישור לא יישבר
  const normalizedPath = req.file.path.replace(/\\/g, '/');
  
  // החזרת הכתובת הסופית שדרכה אפשר לגשת לתמונה שהועלתה [cite: 56]
  res.status(200).send({ url: base + normalizedPath });
});

module.exports = router;