import { APIGatewayProxyHandler } from 'aws-lambda';
import * as response from "../../libs/response";
import Model from "./model";

export const handle: APIGatewayProxyHandler = async () => {
  const result = await Model.list()
  if (result === null) {
    return response.error()
  }

  return response.success(result)
}