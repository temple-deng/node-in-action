const Entry = require('../models/entry');

module.exports = {
  from(req, res) {
    res.render('post', { title: 'Post' });
  },
  submit(req, res, next) {
    const data = req.body.entry;
    const user = res.locals.user;
    const username = user ? user.name : null;
    const entry = new Entry({
      username: username,
      title: data.title,
      body: data.body
    });

    entry.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  },
  list(req, res, next) {
    Entry.getRange(0, -1, (err, entries) => {
      if (err) {
        return next(err);
      }
      res.render('entries', {
        title: 'Entries',
        entries
      });
    })
  }
};
