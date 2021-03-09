function validator(el) {
    return async (req, res, next) => {
        const errors = [];

        const required = 'required';
        const max = 'max';

        console.log(el);

        Object.entries(el).forEach( ([field, rules]) => {
            rules.forEach(rule => {
                const [ruleName, ruleVal, ...params] = rule.split(':');
                switch (ruleName) {
                    case required:
                        if(!req.body[field]) {
                            errors.push({
                                [field]: `please enter ${field}`,
                            });
                        }
                        break;
                    case max:
                        if(req.body[field]) {
                            if(req.body[field].length > ruleVal) {
                                errors.push({
                                    [field]: `this field ${field} is longer, max characters are ${ruleVal}`,
                                });
                            }
                        }
                        break;
                    default:
                        errors.push({
                            ['error']: `something going wrong`,
                        });
                }
            })
        })

        if(errors.length === 0) {
            return next();
        } else {
            return res.send(errors);
        }
    }
}

module.exports = {
    validator
}