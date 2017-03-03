var sendEmail = function() {

  var params = {
    Destination: { /* required */
      BccAddresses: [
        'STRING_VALUE',
        /* more items */
      ],
      CcAddresses: [
        'STRING_VALUE',
        /* more items */
      ],
      ToAddresses: [
        'STRING_VALUE',
        /* more items */
      ]
    },
    Message: { /* required */
      Body: { /* required */
        Html: {
          Data: 'STRING_VALUE', /* required */
          Charset: 'STRING_VALUE'
        },
        Text: {
          Data: 'STRING_VALUE', /* required */
          Charset: 'STRING_VALUE'
        }
      },
      Subject: { /* required */
        Data: 'STRING_VALUE', /* required */
        Charset: 'STRING_VALUE'
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
