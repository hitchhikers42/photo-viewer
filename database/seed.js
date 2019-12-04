
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

const fetchS3Bucket = (callback) => {
  // List all objects in s3 mockbbb bucket
  s3.listObjects({ Bucket: 'mockbbb' }, (err, data) => {
    err ? callback(err)
    : callback(null, data)
  })
}

const seed = ({ Name, Contents }) => {
    Contents.forEach((image, i) => {
      let elements = image.Key.split('/');
      let imgKey = elements.pop();
      let productId = elements.join('/');
      let title = Data[productId].title;

      if(imgKey !== '') {
        db.query(
          'INSERT INTO img VALUES(?, ?, ?, ?)',
          [imgKey, productId, Name, title],
          (err, result) => {
            err ?
              console.error(err) :
              console.log(`
                Successfully added:
                  ImageKey: ${imgKey}
                  Product ID: ${productId}
                  Bucket Name: ${Name}
                  Title/Description: ${title}
               to 'img' Table in 'fec_images' Database
               Item Count = ${i+1}
               ******************************************`);
          }
        );
      }
    });
    // End the db connection to free up the console
    db.end()
}
fetchS3Bucket((err, data) => {
  if (err) {
    console.error(err)
  } else {
    seed(data)
  }
})
module.exports = { seed, fetchS3Bucket }