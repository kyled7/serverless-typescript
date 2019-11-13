import { APIGatewayProxyHandler } from 'aws-lambda';
import * as response from "../../libs/response";
import TodoModel from "./model";

export const handle: APIGatewayProxyHandler = async () => {
  const result = await TodoModel.list()
  if (result === null) {
    return response.error()
  }

  return response.success(result)
}