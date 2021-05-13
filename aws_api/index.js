const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-2'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const dynamoDBTableName = 'patient';
const patientPath = '/patient';
const patientsPath = '/patients';

exports.handler = async function(event) {
  console.log('Request Event: ', event);
  let response;

  switch(true) {
    case event.httpMethod === 'GET' && event.path === patientsPath:
      response = await getPatients();
      break;
    case event.httpMethod === 'GET' && event.path === patientPath:
      response = await getPatient(event.queryStringParameters.patientId);
      break;
    
    case event.httpMethod === 'POST' && event.path === patientPath:
      response = await createPatient(JSON.parse(event.body));
      break;

    case event.httpMethod === 'PATCH' && event.path === patientPath:
      const requestBody = JSON.parse(event.body);
      response = await updatePatient(requestBody.patientId, requestBody.updateKey, requestBody.updateValue);
      break;

    case event.httpMethod === 'DELETE' && event.path === patientPath:
      response = await deletePatient(event.queryStringParameters.patientId);
      break;
  }
  return response;
}

async function getPatient(patientId) {
  const params = {
    TableName: dynamoDBTableName,
    Key: {
      'patientid': patientId
    }
  }
  return await dynamoDB.get(params).promise().then((response) => {
    return buildResponse(200, response.Item);
  }, (error) => {
    console.error('Error: ', error);
  });
}

async function getPatients() {
  const params = {
    TableName: dynamoDBTableName
  }
  const allPacients = await scanDynamoRecords(params, []);
  const body = {
    patients: allPacients
  }
  return buildResponse(200, body);
}

async function scanDynamoRecords(scanParams, itemArray) {
  try {
    const dynamoData = await dynamoDB.scan(scanParams).promise();
    itemArray = itemArray.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
      return await scanDynamoRecords(scanParams, itemArray);
    }
    return itemArray;
  } catch(error) {
    console.error('Error: ', error);
  }
}

async function createPatient(requestBody) {
  const params = {
    TableName: dynamoDBTableName,
    Item: requestBody
  }
  return await dynamoDB.put(params).promise().then(() => {
    const body = {
      Operation: 'SAVE',
      Message: 'SUCCESS',
      Item: requestBody
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('Error: ', error);
  })
}

async function updatePatient(patientId, updateKey, updateValue) {
  const params = {
    TableName: dynamoDBTableName,
    Key: {
      'patientid': patientId
    },
    UpdateExpression: `set ${updateKey} = :value`,
    ExpressionAttributeValues: {
      ':value': updateValue
    },
    ReturnValues: 'UPDATED_NEW'
  }
  return await dynamoDB.update(params).promise().then((response) => {
    const body = {
      Operation: 'UPDATE',
      Message: 'SUCCESS',
      UpdatedAttributes: response
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('Error: ', error);
  })
}

async function deletePatient(patientId) {
  const params = {
    TableName: dynamoDBTableName,
    Key: {
      'patientid': patientId
    },
    ReturnValues: 'ALL_OLD'
  }
  return await dynamoDB.delete(params).promise().then((response) => {
    const body = {
      Operation: 'DELETE',
      Message: 'SUCCESS',
      Item: response
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('Error: ', error);
  })
}

function buildResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },

    body: JSON.stringify(body)
  }
}