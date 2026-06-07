const jwt = require('jsonwebtoken');

// פונקציית התחברות
const login = async (req, res) => {
    const { email, password } = req.body;

    // *הערה: בשלב הבא אנחנו נוסיף כאן בדיקה מול מסד הנתונים כדי לוודא שהיוזר והסיסמה נכונים.
    // כרגע, לשם הלמידה, נניח שהבדיקה עברה בהצלחה ונייצר את הטוקנים:

    try {
        // 1. יצירת Access Token (תג השם - פג תוקף מהר)
        const accessToken = jwt.sign(
            { email: email }, // המידע שנשמור בתוך הטוקן
            process.env.ACCESS_TOKEN_SECRET, // מפתח ההצפנה הסודי מה-.env
            { expiresIn: '15m' } // תוקף: 15 דקות
        );

        // 2. יצירת Refresh Token (תעודת הזהות - תוקף ארוך)
        const refreshToken = jwt.sign(
            { email: email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' } // תוקף: 7 ימים
        );

        // מחזירים את שניהם ללקוח (הפרונט-אנד)
        res.status(200).json({
            message: "Login successful",
            accessToken: accessToken,
            refreshToken: refreshToken
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    login
};