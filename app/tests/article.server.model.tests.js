/* eslint-disable import/no-extraneous-dependencies */
const should = require('should');
const mongoose = require('mongoose');
require('../../server.js');

const User = mongoose.model('User');
const Article = mongoose.model('Article');

let user;
let article;

describe('Article Model Unit Tests:', () => {
  beforeEach((done) => {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password',
    });
    user.save(() => {
      article = new Article({
        title: 'Article Title',
        content: 'Article Content',
        user,
      });
      done();
    });
  });

  describe('Testing the save method', () => {
    it('Should be able to save without problems', () => {
      article.save((err) => {
        should.not.exist(err);
      });
    });

    it('Should not be able to save an article without a title', () => {
      article.title = '';
      article.save((err) => {
        should.exist(err);
      });
    });
  });

  afterEach((done) => {
    Article.deleteOne(() => {
      User.deleteOne(() => {
        done();
      });
    });
  });
});
