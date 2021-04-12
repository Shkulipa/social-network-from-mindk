const db = require('../db/db');
const jwt = require("jsonwebtoken");

function checkACL(rules) {
    return async (req, res, next) => {
        const { user } = req.body;

        try {
            const checkUserJwt = await jwt.verify(user.user_token, process.env.JWT_SECRET);
            if (checkUserJwt) {
                for (const rule of rules) {
                    if (user.permission.includes(rule.permission)) {
                        if (rule.checkAuthor) {
                            const item =  await db.select().from(rule.table).where(rule.column, req.params.id).first();
                            if (item.user_id === checkUserJwt.user_id) {
                                return next();
                            }
                        } else {
                            return next();
                        }
                    }
                }
            }
            return next('Access denied');
        } catch {
            return next('Access denied');
        }
    };
}

module.exports = {
    checkACL
};