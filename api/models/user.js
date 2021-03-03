const db = require('../db/db');

class User {
  static async findByEmail(email_user) {
    // return db.select().from('users').where('email_user', '1111').first();
    return db.select().from('users').where('email_user', String(email_user)).first();
  }

  static async UpdateUserToken(email_user, user_token) {
    // return db.select().from('users').where('email_user', '1111').first();
    return db('users').where('email_user', email_user).update({ user_token: user_token });
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
