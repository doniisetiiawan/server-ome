const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    index: true,
    match: /.+@.+\..+/,
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    validate: [
      (password) => password.length >= 6,
      'Password Should Be Longer',
    ],
  },
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

UserSchema.statics.findOneByUsername = function (
  username,
  callback,
) {
  this.findOne(
    { username: new RegExp(username, 'i') },
    callback,
  );
};

UserSchema.methods.authenticate = function (password) {
  return this.password === password;
};

UserSchema.post('save', function () {
  console.log(
    `The user "${this.username}" details were saved.`,
  );
});

UserSchema.set('toJSON', { getters: true, virtuals: true });

mongoose.model('User', UserSchema);
