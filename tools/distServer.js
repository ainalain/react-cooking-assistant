import express from 'express';
import path from 'path';
import compression from 'compression';
import colors from 'colors';

/* eslint-disable no-console */

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.get('*', function(req, res) {
  res.sendFile(path.resolve( __dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
  console.log(`server is running on port ${port}`.green);
});
