import bookshelf from '../db';
import bcrypt from 'bcrypt';
import { at } from 'lodash';

const TABLE_NAME = 'users';

/**
 * User model.
 */
class User extends bookshelf.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   * Table has timestamps.
   */
  get hasTimestamps() {
    return true;
  }

  static getFillableCollumns(){
    return [
      "first_name",
      "last_name",
      "email",
      "mobile_no",
      "password",
      "balance",
      "created_at",
      "updated_at"
    ]
  }
  static processInputForSave(attrs){
    var result ={};
    // remove all collumns that are not valid 
    let keys = Object.keys(attrs);
    keys.map(item => {
      if(User.getFillableCollumns().includes(item)){
        result[""+item] = attrs[""+item];
      }
    });
    return User.processForPassword(result,keys);
  }

  static async processForPassword(attrs,keys){
    if('password' in attrs){
      attrs["password"] = await User.hashPassword(attrs["password"]);
    }
    return attrs;
  }

  static hashPassword(password) {
    return bcrypt.hash(password, 10)
  }
 
  static validatePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }



  initialize() {
    // this.on('saving', (model, attrs, options) => {
    //   // This is fired before a model insert ot update is called 
    // });
  }

}

export default User;
