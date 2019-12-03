const mysql = require('mysql');

const cx = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

cx.connect(err => {
  if(err) {
    console.error('ERROR CONNECTING TO DATABASE `FEC_IMAGES`')
  } else {
    cx.query('CREATE DATABASE IF NOT EXISTS fec_images', (err => {
      if(err) {
        console.error('ERROR CREATING FEC_IMAGES');
      } else {
        console.log('Successfully created database fec_images!')
        cx.end();
      }
    }))
  }
});
