const db = require('../db/db');

function checkAuthPosts(rules){
    return async (req, res, next) => {
        const isPosts =  await db.select().from(rules[1].table).where(rules[1].column, req.params.id);

        if(isPosts.length != 0) {
            if (req.user) {
                let hasPermission = false;
                for (const rule of rules) {
                    if (!hasPermission) {
                        if (rule.checkAuthor) {
                            if (isPosts[0].user_id == req.user.user_id) {
                                hasPermission = true;
                            }
                        } else {
                            if (req.user.permission.includes(rule.permission)) {
                                hasPermission = true;
                            }
                        }
                    }
                }

                if(!hasPermission) {
                    return next( res.send('Access denied') );
                } else {
                    return next();
                }
            }

        } else {
            return next( res.send('post didn\'t found') );
        }
    }
}

function checkAuthAddPosts(rules) {
    return async (req, res, next) => {
        if (req.user) {
            for (const rule of rules) {
                if(req.user.permission.includes(rule.permission)){
                    next();
                } else {
                    return next( res.send('Access denied') );
                }
            }
        } else {
            return next( res.send('Please login') );
        }
    }
}

module.exports = {
    checkAuthPosts,
    checkAuthAddPosts
};