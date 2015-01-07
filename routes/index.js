
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

  console.log(req);
  sandbox.run('1+1', function(output) {
    res.send(output);
  });

};

