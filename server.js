const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/championship-frontend'));

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/dist/championship-frontend/index.html');
});

app.listen(process.env.PORT || 4200);
