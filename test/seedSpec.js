const { expect } = require('chai');
const mysql = require('mysql');

beforeEach('Connect to the database', function() {
  db = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'fec_images'
  });
  db.connect(function(err) {
    if (err) { return done(err); }
  });

})

describe('Testing seed', function() {

  it('Expect 12 entries in "img" table', function(done) {
    var q = 'SELECT * FROM img';
    db.query(q, (err, results) => {
      if(err) {
        console.error(err);
        done(err)
      } else {
        expect(results.length).to.equal(12)
        done()
      }
    })

  })
  it('Expect 4 entries in "img" table with productId = "BES870XL"', function(done) {
    var q = 'SELECT * FROM img WHERE productId = ?';
    db.query(q, ['BES870XL'], (err, results) => {
      if (err) {
        done(err)
      }
      expect(results.length).to.equal(4)
      done()
    })
  })
})
