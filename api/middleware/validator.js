function validator(el) {
    return async (req, res, next) => {
        const errors = [];

        const required = "required";
        const max = "max";
        const size = "size";
        const type = "type";

        Object.entries(el).forEach(([field, rules]) => {
            rules.forEach((rule) => {
                const [ruleName, ruleVal] = rule.split(":");
                switch (ruleName) {
                    case required:
                        if (!req.body[field]) {
                            errors.push({
                                [field]: `please enter ${field}`,
                            });
                        }
                        break;
                    case max:
                        if (req.body[field]) {
                            if (req.body[field].length > ruleVal) {
                                errors.push({
                                    [field]: `this field ${field} is longer, max characters are ${ruleVal}`,
                                });
                            }
                        }
                        break;
                    case size:
                        if (req.body[field]) {
                            if (req.body[field].size > ruleVal) {
                                errors.push({
                                    [field]: `max size your image is ${ruleVal}`,
                                });
                            }
                        }
                        break;
                    case type:
                        if (req.body[field]) {
                            const { type } = req.body[field];
                            const arrFromString = ruleVal.split("||");

                            if (!arrFromString.includes(type)) {
                                errors.push({
                                    [field]:
                                        "your image should be PNG, JPG or JPEG",
                                });
                            }
                        }
                        break;
                    default:
                        errors.push({
                            ["error"]: "something going wrong",
                        });
                }
            });
        });

        if (errors.length === 0) {
            return next();
        } else {
            return res.send(errors);
        }
    };
}

module.exports = {
    validator,
};
