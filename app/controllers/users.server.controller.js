const User = require('mongoose').model('User');

function getErrorMessage(err) {
  let message = '';
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    // eslint-disable-next-line no-restricted-syntax
    for (const errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  return message;
}

exports.signup = (req, res, next) => {
  if (!req.user) {
    const user = new User(req.body);
    user.provider = 'local';
    user.save((err) => {
      if (err) {
        const message = getErrorMessage(err);
        req.flash('error', message);
        return res.redirect('/signup');
      }
      req.login(user, (err) => {
        if (err) return next(err);
        return res.redirect('/');
      });
    });
  } else {
    return res.redirect('/');
  }
};

exports.signout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.create = (req, res, next) => {
  const user = new User(req.body);

  user.save((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json(user);
  });
};

exports.list = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      return next(err);
    }
    res.status(200).json(users);
  });
};

exports.read = (req, res) => {
  res.json(req.user);
};

exports.userByID = (req, res, next, id) => {
  User.findOne(
    {
      _id: id,
    },
    (err, user) => {
      if (err) {
        return next(err);
      }
      req.user = user;
      next();
    },
  );
};

exports.update = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user.id,
    req.body,
    {
      new: true,
    },
    (err, user) => {
      if (err) {
        return next(err);
      }
      res.status(200).json(user);
    },
  );
};

exports.delete = (req, res, next) => {
  req.user.remove((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json(req.user);
  });
};
