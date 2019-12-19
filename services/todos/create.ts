import { APIGatewayProxyHandler } from 'aws-lambda';
import * as response from "../../libs/response";
import TodoModel from "./model";

export const handle: APIGatewayProxyHandler = async (event) => {
  const data = JSON.parse(event.body)

  const result = await TodoModel.create(data)
  if (result === null) {
    return response.error()
  }

  return response.success(result)
}