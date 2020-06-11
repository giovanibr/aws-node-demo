// express
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');

// permite upload de arquivos
app.use(fileUpload({
  createParentPath: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// configura endpoints
const routes = require('./routes/routes');
app.use('/aws-demo', routes);

// start
app.listen(3000, () => {
  console.log('AWS Demo running on port 3000');
})