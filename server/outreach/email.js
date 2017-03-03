var newGoalEmail = function(goalID, email, backers) {

  var params = {
    Destination: {
      CcAddresses: backers,
      ToAddresses: [email]
    },
    Message: {
      Body: {
        Html: {
          Data: 'STRING_VALUE', /* required */
          Charset: 'UTF-8'
        },
        Text: {
          Data: 'STRING_VALUE', /* required */
          Charset: 'UTF-8'
        }
      },
      Subject: { /* required */
        Data: 'New Goal!', /* required */
        Charset: 'UTF-8'
      }
    },
    Source: 'STRING_VALUE', /* required */
    ConfigurationSetName: 'STRING_VALUE',
    ReplyToAddresses: [
      'STRING_VALUE',
      /* more items */
    ],
    ReturnPath: 'STRING_VALUE',
    ReturnPathArn: 'STRING_VALUE',
    SourceArn: 'STRING_VALUE',
    Tags: [
      {
        Name: 'STRING_VALUE', /* required */
        Value: 'STRING_VALUE' /* required */
      },
      /* more items */
    ]
  };
  ses.sendEmail(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
};
