const db = require("../db/db");
const jwt = require("jsonwebtoken");

function checkACL(rules) {
    return async (req, res, next) => {
        const { user } = req.body;

        try {
            const checkUserJwt = await jwt.verify(
                user.userToken,
                process.env.JWT_SECRET
            );
            if (checkUserJwt) {
                for (const rule of rules) {
                    if (user.permission.includes(rule.permission)) {
                        if (rule.checkAuthor) {
                            const item = await db
                                .select()
                                .from(rule.table)
                                .where(rule.column, req.params.id)
                                .first();
                            if (item.userId === checkUserJwt.userId) {
                                return next();
                            }
                        } else {
                            return next();
                        }
                    }
                }
            }
            return next("Access denied");
        } catch (error) {
            return next("Access denied");
        }
    };
}

module.exports = {
    checkACL,
};
