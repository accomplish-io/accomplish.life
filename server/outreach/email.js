// var newGoalEmail = function(goalID, email, backers) {

//   var params = {
//     Destination: {
//       CcAddresses: backers,
//       ToAddresses: [email]
//     },
//     Message: {
//       Body: {
//         Html: {
//           Data: 'STRING_VALUE', /* required */
//           Charset: 'UTF-8'
//         },
//         Text: {
//           Data: 'STRING_VALUE', /* required */
//           Charset: 'UTF-8'
//         }
//       },
//       Subject: { /* required */
//         Data: 'New Goal!', /* required */
//         Charset: 'UTF-8'
//       }
//     },
//     Source: 'STRING_VALUE', /* required */
//     ConfigurationSetName: 'STRING_VALUE',
//     ReplyToAddresses: [
//       'STRING_VALUE',
//       /* more items */
//     ],
//     ReturnPath: 'STRING_VALUE',
//     ReturnPathArn: 'STRING_VALUE',
//     SourceArn: 'STRING_VALUE',
//     Tags: [
//       {
//         Name: 'STRING_VALUE', /* required */
//         Value: 'STRING_VALUE' /* required */
//       },
//       /* more items */
//     ]
//   };
//   ses.sendEmail(params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log(data);           // successful response
//   });
// };

require('dotenv').load();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gmail.' + process.env.EMAIL_USER,
        pass: process.env.EMAIL_PW
    }
});

var newGoalEmail = function(user, backerEmail, goalTitle) {
  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Accomplish.io" <' + process.env.EMAIL_USER + '>', // sender address
      to: backerEmail, // list of receivers
      subject: 'A friend of yours started a new goal!', // Subject line
      text: 'Hello world ?', // plain text body
      html: '<b>Hello world ?</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
};
