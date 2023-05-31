'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.voteProcessing = async (event) => {
  try {
    // Obtener los datos enviados en la solicitud de votación
    const requestBody = JSON.parse(event.body);
    const voteId = requestBody.voteId;
    const voteOption = requestBody.voteOption;

    // Guardar el voto en la tabla de DynamoDB
    const params = {
      TableName: 'myVotesTable',
      Item: {
        voteId: voteId,
        voteOption: voteOption,
        timestamp: new Date().toISOString()
      }
    };
    await dynamoDB.put(params).promise();

    // Devolver una respuesta exitosa
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Reemplaza con el origen permitido en producción
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ message: 'Vote processed successfully' })
    };
  } catch (error) {
    console.log(error);
    // Devolver una respuesta de error
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process vote xd' })
    };
  }
};
