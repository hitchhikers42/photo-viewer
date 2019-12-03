
const db = require('./db.js');
/* Import AWS SDK */
const AWS = require('aws-sdk');

/* Import assisting data that will attatch to
   incoming AWS Query before adding to database */
const  Data = require('./seedData.js')

/* Load AWS configuration file */
AWS.config.loadFromPath('./config/aws.json')

/* Create AWS S3 Instance */
const s3 = new AWS.S3()

const fetchObjects = (callback) => {
  // List all objects in s3 mockbbb bucket
  s3.listObjects({ Bucket: 'mockbbb' }, (err, data) => {
    err ? callback(err)
    : callback(null, data)
  })
}
fetchObjects((err, data) => {
  if (err) {
    console.error(err)
  } else {
    const bucket = data.Name;
    data.Contents.forEach(image => {
      var keyElements = image.Key.split('/');
      var imgKey = keyElements.pop()
      var productId = keyElements.join('/')
      var title = Data[productId].title;
      var params = [imgKey, productId, bucket, title];
      db.query(
        'INSERT INTO img VALUES(?, ?, ?, ?)',
        params,
        (err, result) => {
          err ?
            console.error(err) :
            console.log(`Successfully added ${params.join(' ')} to database`);
        });
    });
    // End the db connection to free up the console
    db.end()
  }
})