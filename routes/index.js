
/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', {
    title: 'Express',
    hoge: 'Hello World'
  });
};

exports.sandbox = function(req, res) {
  var Sandbox = require('sandbox'),
      sandbox = new Sandbox();

  var bodyParser = require('body-parser');

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyparser.json());
  console.log(req);
  sandbox.run('1+1', function(output) {
    res.send(output);
  });

};

