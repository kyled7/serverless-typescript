import { APIGatewayProxyHandler } from 'aws-lambda';
import * as response from "../../libs/response";
import Model, { validate } from "./model";

export const handle: APIGatewayProxyHandler = async (event) => {
  const data = JSON.parse(event.body)

  if (!validate(data)) {
    return response.error(400, "Wrong input data!")
  }

  const result = await Model.create(data)
  if (result === null) {
    return response.error()
  }

  return response.success(result)
}