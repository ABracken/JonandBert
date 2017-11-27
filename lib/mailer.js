const SendGrid = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY);
const helper = require('sendgrid').mail;
const Promise = require("bluebird");

const service = {
  sendEmail: sendEmail
};

module.exports = service;

////////////////

function sendEmail(rsvp) {
  return new Promise((fulfill, reject) => {
    let from_email = new helper.Email(process.env.APP_EMAIL, "JonAndBrittany.us");
    let to_email = new helper.Email(process.env.TO_EMAIL);
    let subject = ' ';
    let content = new helper.Content('text/html', ' ');

    let mail = new helper.Mail();
    mail.setFrom(from_email);
    mail.setSubject(subject);
    mail.addContent(content);

    let personalization = new helper.Personalization();
    personalization.addTo(to_email);

    personalization.addSubstitution({ '%name%': rsvp.name });
    personalization.addSubstitution({ '%email%': rsvp.email });
    personalization.addSubstitution({ '%song%': rsvp.song });
    personalization.addSubstitution({ '%comments%': rsvp.comments || '(They had nothing to say!)' });
    mail.addPersonalization(personalization);

    mail.setTemplateId(process.env.SENDGRID_TEMPLATE_RSVP);

    let requestBody = mail.toJSON();
    let request = SendGrid.emptyRequest();
    request.method = 'POST';
    request.path = '/v3/mail/send';
    request.body = requestBody;

    SendGrid.API(request, function(response) {
      if (response.statusCode === 202 || response.statusCode === 200) {
        fulfill('Sendgrid sent email');
      } else {
        reject('Sendgrid failed to send email');
      }
    });
  });
}
