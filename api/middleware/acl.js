const db = require('../db/db');

/*function checkAuthorized(rules){
    return async (req, res, next) => {
        if (req.user) {
            if (rules.some((rule) => req.user.permission.includes(rule.permission))) {
                return next();
            }
        } else {
            next('Access denied');
        }
    }
}*/

function checkAuthorizedPosts(rules){
    return async (req, res, next) => {
        const isPosts =  await db.select().from('posts').where('post_id', req.params.id);

        if(isPosts.length != 0) {

            if (req.user) {
                let hasPermission = false;
                for (const rule of rules) {
                    if (!hasPermission) {
                        if (rule.checkAuthor) {
                            const item = await db.select().from('posts').where('post_id', req.params.id);
                            if (item[0].user_id == req.user.user_id) {
                                await db('posts').where('post_id', req.params.id).del();
                                hasPermission = true;
                            }
                        } else {
                            if (req.user.permission.includes(rule.permission)) {
                                await db('posts').where('post_id', req.params.id).del();
                                hasPermission = true;
                            }
                        }
                    }
                }

                if(!hasPermission) {
                    next('Access denied');
                } else {
                    next('post deleted');
                }
            }

        } else {
            next('post didn\'t found');
        }
    }
}

function checkAuthPostsUpdate(rules){
    return async (req, res, next) => {
        const isPosts =  await db.select().from('posts').where('post_id', req.params.id);

        if(isPosts.length != 0) {

            if (req.user) {
                let hasPermission = false;
                for (const rule of rules) {
                    if (!hasPermission) {
                        if (rule.checkAuthor) {
                            const item = await db.select().from('posts').where('post_id', req.params.id);
                            if (item[0].user_id == req.user.user_id) {
                                await db('posts').where('post_id', req.params.id).update({ description: req.body.text })
                                hasPermission = true;
                            }
                        } else {
                            if (req.user.permission.includes(rule.permission)) {
                                await db('posts').where('post_id', req.params.id).update({ description: req.body.text })
                                hasPermission = true;
                            }
                        }
                    }
                }

                if(!hasPermission) {
                    res.send('Access denied');
                } else {
                    res.send('post success updated');
                }
            }

        } else {
            res.send('post didn\'t found');
        }
    }
}

async function checkAuthUser(req, res, next) {
    if(req.user) {
        try {
            const description = req.body.description;
            const user_id = req.user.user_id;
            const newPost = await db('posts').insert({description: description, user_id: user_id});
            next(newPost, res.send('post added'));
        } catch(err) {
            console.error(err.message)
        }
    } else {
        res.send('please log in')
    }
}

module.exports = {
    checkAuthorizedPosts,
    checkAuthPostsUpdate,
    checkAuthUser
};