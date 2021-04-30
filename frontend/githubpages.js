var ghpages = require('gh-pages');

ghpages.publish('public', {
  user: {
    name: 'Jeffrey Weng',
    email: 'jweng2014@hotmail.com'
  }
}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Success');
  }
});