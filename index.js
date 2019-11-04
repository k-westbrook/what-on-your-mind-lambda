const uuidV4 = require('uuid/v4');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-1" });

exports.handler = (event, context, callback) => {
  const params = {
    Item: {
      comment_id: uuidV4(),
      category: event.category,
      comment: event.comment,
      date: event.date,
      printDate: event.printDate
    },
    TableName: "COMMENT"
  };

  docClient.put(params, function (err, data) {

    if (err) {

      data = {
        statusCode: 403,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: {
          message: JSON.stringify('ERROR, comment not added.')
        }
      };
      callback(null, data);

    } else {

      data = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: {

          message: JSON.stringify('Successful creation in table.'),
          comment: params.Item
        }

      };
      callback(null, data);

    }
  })




};
