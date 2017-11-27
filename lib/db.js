const mdbClient = require('mongodb').MongoClient;

module.exports = {
  insertRsvp: (rsvp) => {
    return mdbClient
      .connect(process.env.MONGODB_URI)
      .then((db) => {
        return db.collection('rsvps').insert(rsvp, {w: 1});
      });
  },
  getRsvps: () => {
    return mdbClient
      .connect(process.env.MONGODB_URI)
      .then((db) => {
        return db.collection('rsvps').find().toArray();
      });
  },
  emailExists: (email) => {
    return mdbClient
      .connect(process.env.MONGODB_URI)
      .then((db) => {
        return db.collection('rsvps').find({ email: email }).toArray();
      })
  }
}
