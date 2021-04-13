const db = require("../db/db");

class User {
    static async findByEmail(emailUser) {
        return db
            .select()
            .from("users")
            .where("emailUser", String(emailUser))
            .first();
    }
}

module.exports = User;
