
/*
 * GET users listing.
 */

exports.list = function(req, res){
  var users = ['Ryo', 'Shohei', 'Shu'];
  res.render('users', {
    users: users
  });
};
