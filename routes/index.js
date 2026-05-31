const express = require('express');
const router = express.Router();

// 1. אנחנו מייבאים לכאן את כל הראוטרים הספציפיים שלנו
const sitterRouter = require('./sitter_routes');
// בעתיד נוסיף כאן גם: const petRouter = require('./pet_routes'); וכו'

// 2. אנחנו מחברים את הראוטרים ומגדירים להם את הקידומת שלהם
router.use('/sitter', sitterRouter);

// ייבוא הראוטר של החיות
const petRouter = require('./pet_routes');

// הגדרת הקידומת לחיות
router.use('/pets', petRouter);

// 3. ניתוב ברירת מחדל רק כדי לבדוק שהשרת מגיב (כמו במצגת)
router.get('/', (req, res) => {
    res.send('Welcome to PawStep API');
});

// 4. מייצאים את המרכזייה החוצה כדי שהקובץ הראשי יוכל להשתמש בה
module.exports = router;