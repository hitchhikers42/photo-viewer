const mysql = require('mysql');

const cx = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fec_images'
});

cx.connect(err => {
  if(err) {
    console.error('ERROR CONNECTING TO DATABASE `FEC_IMAGES`')

  } else {
    console.log('Successfully connected to FEC_IMAGES')
  }
});

module.exports = cx;