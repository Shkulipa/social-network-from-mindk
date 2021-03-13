const db = require('../db/db');

function checkACL(rules) {
    return async (req, res, next) => {
        const { user } = req;

        if (user) {
            for (const rule of rules) {
                if (user.permission.includes(rule.permission)) {
                    if (rule.checkAuthor) {
                        const item =  await db.select().from(rule.table).where('post_id', req.params.id);
                        if (item[rule.column] === user.user_id) {
                            return next();
                        }
                    } else {
                        return next();
                    }
                }
            }
        }

        return next('Access denied');
    };
}

module.exports = {
    checkACL
};