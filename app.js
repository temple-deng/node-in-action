const express = require('express');
const app = express();

// third party middlewares
const bodyParser = require('body-parser');
const session = require('express-session');

// models
const { Article } = require('./models/article');

// routes
const entries = require('./routes/entries'); 
const register = require('./routes/register');

// tools
const read = require('node-readability');

const port = process.env.PORT || 3000;

app.set('port', port);
app.set('view engine', 'ejs');

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(
  '/css/bootstrap.css',
  express.static('node_modules/bootstrap/dist/css/bootstrap.min.css')
);


// 第 6 章 留言框的路由
// 留言
app.get('/', entries.list);
app.get('/post', entries.from);
app.post('/post', entries.submit);

// 注册及登录
app.get('/register', register.form);
app.post('/register', register.submit);



// articles demo 的路由
app.get('/articles', (req, res, next) => {
  Article.all((err, articles) => {
    if (err) {
      return next(err);
    }
    res.format({
      html: () => {
        res.render('articles.ejs', { articles, title: 'Articles' });
      },
      json: () => {
        res.send(articles);
      }
    });
  });
});

app.get('/articles/:id', (req, res, next) => {
  Article.find(req.params.id, (err, article) => {
    if (err) {
      return next(err);
    }
    res.format({
      html: () => {
        res.render('article.ejs', article);
      },
      json: () => {
        res.send(article);
      }
    })
  })
});

app.post('/articles', (req, res, next) => {
  const url = req.body.url;
  read(url, (err, result) => {
    if (err || !result) {
      res.status(500).send('Error downloading article');
    }

    Article.create(
      {
        title: result.title,
        content: result.content
      },
      (err, article) => {
        if (err) {
          return next(err);
        }
        res.send('OK');
      }
    )
  })
});

app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  Article.delete(id, (err) => {
    if (err) {
      return next(err);
    }
    res.send({
      message: 'Deleted'
    });
  })
});

app.listen(app.get('port'), () => {
  console.log(`Express web app available at localhost: ${app.get('port')}`);
});

module.exports = app;