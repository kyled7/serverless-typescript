import { APIGatewayProxyResult } from "aws-lambda"

export const success = (body: any) : APIGatewayProxyResult => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Successful!',
      data: body
    })
  }
}

export const error = (statusCode=500, message?: any,) : APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify({
      message: message || 'Server error!'
    })
  }
}