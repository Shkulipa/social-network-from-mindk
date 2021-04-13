const passport = require("passport-strategy");
const util = require("util");
const axios = require("axios").default;

// const GOOGLE_AUTH_ENDPOINT = 'https://www.googleapis.com/oauth2/v3/userinfo';
const FACEBOOK_AUTH_ENDPOINT = "https://graph.facebook.com/";
// {your-user-id}?fields=id,name,email&access_token={your-user-access-token}

function Strategy(options, verify) {
    options = options || {};
    const version = options.graphAPIVersion || "v3.2";

    options.authorizationURL =
        options.authorizationURL ||
        "https://www.facebook.com/" + version + "/dialog/oauth";
    options.tokenURL =
        options.tokenURL ||
        "https://graph.facebook.com/" + version + "/oauth/access_token";
    options.scopeSeparator = options.scopeSeparator || ",";

    OAuth2Strategy.call(this, options, verify);
    this.name = "facebook";
    this._profileURL =
        options.profileURL || "https://graph.facebook.com/" + version + "/me";
    this._profileFields = options.profileFields || null;
    this._enableProof = options.enableProof;
    this._clientSecret = options.clientSecret;
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy);

/**
 * Authenticate request based on accessToken
 *
 * @param {Object} req
 * @api protected
 */
Strategy.prototype.authenticate = function (req, options) {
    options = options || {};

    const authHeader = req.headers.authorization;
    const accessToken = authHeader ? authHeader.replace("Bearer ", "") : null;

    if (!accessToken) {
        return this.fail(
            { message: options.badRequestMessage || "Missing access token" },
            400
        );
    }

    const self = this;

    function verified(err, user, info) {
        if (err) {
            return self.error(err);
        }
        if (!user) {
            return self.fail(info);
        }
        self.success(user, info);
    }

    try {
        axios
            .get(GOOGLE_AUTH_ENDPOINT, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                responseType: "json",
            })
            .then((response) => {
                self._verify(response.data, verified);
            }, self.error);
    } catch (ex) {
        return self.error(ex);
    }
};

module.exports = Strategy;
