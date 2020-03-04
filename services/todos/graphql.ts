import { APIGatewayProxyHandler } from 'aws-lambda';
import { graphql, buildSchema } from "graphql";
import schema from "./graphql/schema";
import resolver from "./graphql/resolver";

export const handle : APIGatewayProxyHandler = async (event) => {
  const body = JSON.parse(event.body)

  const result = await graphql({
    schema: buildSchema(schema), 
    source: body.query,
    rootValue: resolver
  })

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  }
}