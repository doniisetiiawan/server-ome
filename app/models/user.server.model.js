/* eslint-disable func-names */
const mongoose = require('mongoose');
const crypto = require('crypto');

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    index: true,
    match: [
      /.+@.+\..+/,
      'Please fill a valid e-mail address',
    ],
  },
  username: {
    type: String,
    unique: true,
    required: 'Username is required',
    trim: true,
  },
  password: {
    type: String,
    validate: [
      (password) => password.length >= 6,
      'Password Should Be Longer',
    ],
  },
  salt: {
    type: String,
  },
  provider: {
    type: String,
    required: 'Provider is required',
  },
  providerId: String,
  providerData: {},
  website: {
    type: String,
    set(url) {
      if (!url) {
        return url;
      }
      if (
        url.indexOf('http://') !== 0
        && url.indexOf('https://') !== 0
      ) {
        url = `http://${url}`;
      }

      return url;
    },
    get(url) {
      if (!url) {
        return url;
      }
      if (
        url.indexOf('http://') !== 0
        && url.indexOf('https://') !== 0
      ) {
        url = `http://${url}`;
      }
      return url;
    },
  },
  role: {
    type: String,
    enum: ['Admin', 'Owner', 'User'],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.virtual('fullName')
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function (fullName) {
    const splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
  });

UserSchema.pre('save', function (next) {
  if (this.password) {
    this.salt = Buffer.from(
      crypto.randomBytes(16).toString('base64'),
      'base64',
    );
    this.password = this.hashPassword(this.password);
  }
  next();
});

UserSchema.methods.hashPassword = function (password) {
  return crypto.pbkdf2Sync(
    password,
    this.salt,
    10000,
    64,
    'base64',
  );
};

UserSchema.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password);
};

UserSchema.statics.findOneByUsername = function (
  username,
  callback,
) {
  this.findOne(
    { username: new RegExp(username, 'i') },
    callback,
  );
};

UserSchema.statics.findUniqueUsername = function (
  username,
  suffix,
  callback,
) {
  const possibleUsername = username + (suffix || '');
  this.findOne(
    { username: possibleUsername },
    (err, user) => {
      if (!err) {
        if (!user) {
          callback(possibleUsername);
        } else {
          return this.findUniqueUsername(
            username,
            (suffix || 0) + 1,
            callback,
          );
        }
      } else {
        callback(null);
      }
    },
  );
};

UserSchema.post('save', function () {
  console.log(
    `The user "${this.username}" details were saved.`,
  );
});

UserSchema.set('toJSON', { getters: true, virtuals: true });

mongoose.model('User', UserSchema);
