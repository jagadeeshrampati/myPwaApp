const path = require('path');
const express = require('express');
const app = express();

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}

// Serve static files
app.use(express.static(__dirname + '/dist/myPwaApp'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/myPwaApp/index.html'));
});
app.use(forceSSL());
// default Heroku port
app.listen(process.env.PORT || 5000);