const db = require('../db/db');

class User {
  // static tableName = 'users';

  static async findByEmail(email_user) {
    return db.select().from('users').where('email_user', email_user ).first();
  }

  static async saveUser(user) {
    let result = null;
    // WARNING: validate incoming data before insert or update
    if (user.user_id) {
      result = db('users').where('user_id', user.user_id).update(user);
    } else {
      // @TODO: Use Insert statement to create new user:
    }

    return result;
  }

  static findByToken(token) {
    return db.select().from('users').where('user_token', token).first();
  }
}

module.exports = User;
