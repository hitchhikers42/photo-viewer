const mysql = require('mysql');

const cx = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'fec_images'
});

cx.connect(err => {
  err ? console.error('ERROR CONNECTING TO DATABASE `FEC_IMAGES`')
  : console.log('Successfully connected to FEC_IMAGES')
});

module.exports = cx;