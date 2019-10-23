import { APIGatewayProxyHandler } from 'aws-lambda';

import * as todoModel from "../model/todo"

export const list: APIGatewayProxyHandler = async () => {
  let response = {
    statusCode:200,
    body: ""
  }
  await todoModel.list().then((result) => {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Successful!',
        body: result
      })
    }
  }).catch((error) => {
    console.error(error)
    response = {
      statusCode: error.statusCode || 500,
      body: error.message || "Server error!"
    }
  })
  return response
}

export const create: APIGatewayProxyHandler = async (event) => {
  const data = JSON.parse(event.body)
  let response = {
    statusCode:200,
    body: ""
  }
  await todoModel.add(data).then((result) => {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Created successful!',
        body: result
      })
    }
  }).catch((error) => {
    console.error(error)
    response = {
      statusCode: error.statusCode || 500,
      body: error.message || "Could not create!"
    }
  })
  return response
}

export const read: APIGatewayProxyHandler = async (event) => {
  const id = event.pathParameters.id

  let response = {
    statusCode: 200,
    body: ""
  }

  await todoModel.get(id).then((result) => {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Get data successful!',
        body: result
      })
    }
  }).catch((error) => {
    console.error(error)
    response = {
      statusCode: error.statusCode || 500,
      body: error.message || "Could not get data!"
    }
  })

  return response
}

export const update: APIGatewayProxyHandler = async (event) => {
  const id = event.pathParameters.id
  const data = JSON.parse(event.body)

  let response = {
    statusCode: 200,
    body: ""
  }

  await todoModel.update(id, data).then((result) => {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Updated successful!',
        body: result
      })
    }
  }).catch((error) => {
    console.error(error);
    response = {
      statusCode: error.statusCode || 500,
      body: error.message || "Could not update!"
    }
  })

  return response
}

export const deleteTodo: APIGatewayProxyHandler = async (event) => {
  const id = event.pathParameters.id

  let response = {
    statusCode: 200,
    body: ""
  }

  await todoModel.deleteTodo(id).then(() => {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Deleted successful!'
      })
    }
  }).catch((error) => {
    console.error(error);
    response = {
      statusCode: error.statusCode || 500,
      body: error.message || "Could not delete!"
    }
  })

  return response
}