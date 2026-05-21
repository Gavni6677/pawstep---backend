const express = require('express');
const app = express();
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
const sitterRouter = require('./routes/sitter_routes');
app.use('/sitter', sitterRouter);

// הפעלת השרת על פורט 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});