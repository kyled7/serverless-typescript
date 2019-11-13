import { APIGatewayProxyHandler } from 'aws-lambda';
import * as response from "../../libs/response";
import Model from "./model";

export const handle: APIGatewayProxyHandler = async (event) => {
  const id = event.pathParameters.id
  const result = await Model.read(id)
  
  if (result === null) {
    return response.error()
  }

  return response.success(result)
}