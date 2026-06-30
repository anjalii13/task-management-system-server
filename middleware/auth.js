const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    try {
        const authHeader =
            req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send({
                msg: "Token missing"
            });
        }

        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).send({
                msg: "Invalid token format"
            });
        }

        const token =
            authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.SECRET_KEY
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).send({
            msg: "Invalid Token"
        });
    }
}

function admin(req, res, next) {

    console.log("USER:", req.user);

    if (
        !req.user ||
        req.user.role !== "admin"
    ) {
        return res.status(403).send({
            msg: "Admin access only"
        });
    }

    next();
}

module.exports = {
    auth,
    admin
};