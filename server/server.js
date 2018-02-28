const express  = require('express');
const path = require('path');
const envFile = require('node-env-file');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

try{
  const file = envFile(path.join(__dirname, './../config/'+ process.env.NODE_ENV + '.env'));
  process.env.API_KEY = file.API_KEY;
  process.env.AUTH_DOMAIN = file.AUTH_DOMAIN;
  process.env.PROJECT_ID = file.PROJECT_ID;
  process.env.DATABASE_URL = file.DATABASE_URL;
  process.env.STORAGE_BUCKET = file.STORAGE_BUCKET;
  process.env.MESSAGING_SENDER_ID = file.MESSAGING_SENDER_ID;
}
catch(e){
  throw e;
}

const app = express();

app.use(express.static(__dirname + './../public'));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(index);
})

app.get('/firebase', (req,res) => {
    res.send({
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID    });
  });
app.listen(PORT, () => {
  console.log(`Server Up at ${PORT}`);
})
