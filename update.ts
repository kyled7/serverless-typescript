import { APIGatewayProxyHandler } from 'aws-lambda';
import * as response from "../../libs/response";
import Model from "./model";

export const handle: APIGatewayProxyHandler = async (event) => {
  const id = event.pathParameters.id
  const data = JSON.parse(event.body)

  const result = await Model.update(id, data)
  if (result === null) {
    return response.error()
  }

  return response.success(result)
}
