const express = require('express');
const app = express();
const cors = require('cors');
// טעינת ההגדרות מקובץ ה-.env
const dotenv = require("dotenv").config(); 
const port = process.env.PORT; // שאיבת הפורט מהקובץ

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// הגדרת פארסר לבקשות נתונים
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' })); 
app.use(bodyParser.json()); 
app.use(cors());

// --- התוספת שלנו להגשת קבצים סטטיים ---
// הגדרת "virtual prefix" כך שכל מה שבתוך תיקיית public יהיה נגיש בכתובת דרך /public [cite: 12, 14]
app.use('/public', express.static('public'));

// חיבור למסד הנתונים מונגו
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection; 

db.on('error', error => { console.error(error) }); 
db.once('open', () => console.log('Connected to MongoDB successfully')); 

// ייבוא וקישור הראוטר של נותני השירות
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// --- התוספת שלנו לניתוב העלאת התמונות ---
const fileRouter = require('./routes/file_routes');
app.use('/file', fileRouter);

// הפעלת השרת על פורט 3000
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});