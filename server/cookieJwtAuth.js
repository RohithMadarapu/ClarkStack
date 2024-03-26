const jwt = require("jsonwebtoken")

exports.cookieJwtAuth = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.user = user;
        next();
    } catch (err) {
        res.clearCookie("token");
        console.log(err);
    }
}

