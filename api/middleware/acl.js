function checkAuthorized(rules){
    return async (req, res, next) => {
        if (req.user) {
            if (rules.some((rule) => req.user.permission.includes(rule.permission))) {
                return next();
            }
        } else {
            next('Access denied');
        }
    }
}

module.exports = {
    checkAuthorized,
};