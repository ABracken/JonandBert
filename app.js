require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const mailer = require('./lib/mailer');
const db = require('./lib/db');
const bodyParser = require('body-parser');

app.use(express.static('./public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + './public/index.html');
});

app.post('/api/rsvp', (req, res) => {
	if(!req.body.name || !req.body.email || !req.body.song) {
		return res.status(400).json('There wasn\'t enough information filled out in the form, please make sure all required information has been filled out and try again.');
	}

  db
    .emailExists(req.body.email)
    .then((emails) => {
      if(emails.length) {
        return res.status(400).json('You have already RSVPd! If you would like to change your RSVP, please email adriannmbracken214@hotmail.com!')
      } else {
        mailer
      		.sendEmail(req.body)
          .then(() => db.insertRsvp(req.body))
      		.then(() => res.status(200).json('success'))
      		.catch(res.status(500).send);
      }
    })

});

app.get('/api/rsvp', (req, res) => {
  if(req.query.token !== process.env.AUTH_TOKEN) {
    return res.status(401).send();
  }

  db
    .getRsvps()
    .then(rsvps => res.json(rsvps))
    .catch(res.status(500).send);
})

module.exports = app;