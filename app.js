const express = require('express');
const app = express();
// טעינת ההגדרות מקובץ ה-.env
const dotenv = require("dotenv").config(); 
const port = process.env.PORT; // שאיבת הפורט מהקובץ

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// הגדרת פארסר לבקשות נתונים (עמוד 21 במדריך)
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' })); 
app.use(bodyParser.json()); 

// חיבור למסד הנתונים מונגו (עמוד 4 במדריך)
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection; 

db.on('error', error => { console.error(error) }); 
db.once('open', () => console.log('Connected to MongoDB successfully')); 

// ייבוא וקישור הראוטר של נותני השירות
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// הפעלת השרת על פורט 3000
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});