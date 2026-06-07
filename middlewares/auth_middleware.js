const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // 1. שולפים את כותרת ההרשאה (Authorization Header) מתוך הבקשה
    const authHeader = req.headers['authorization'];
    
    // הטוקן נראה ככה: "Bearer eyJhbGci...", אז אנחנו מפרידים ורוצים רק את החלק השני (הטוקן עצמו)
    const token = authHeader && authHeader.split(' ')[1];

    // 2. אם אין טוקן בכלל במעטפה - זורקים החוצה עם שגיאה 401 (חסר הרשאה)
    if (token == null) return res.status(401).json({ message: "Access denied. No token provided." });

    // 3. אם יש טוקן, בודקים אם הוא מקורי ובתוקף בעזרת מפתח ההצפנה הסודי שלנו
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        // אם הטוקן פג תוקף או מזויף - זורקים החוצה עם שגיאה 403 (גישה נדחתה)
        if (err) return res.status(403).json({ message: "Invalid or expired token." });

        // אם הכל תקין - שומרים את פרטי המשתמש בתוך הבקשה ומעבירים הלאה לקונטרולר!
        req.user = user;
        next(); // "פתח את הדלת, אפשר להמשיך!"
    });
};

module.exports = authenticateToken;