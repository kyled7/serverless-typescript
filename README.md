# Introduce
Serverless RestAPI example with TypeScript, DynamoDB, offline development

# Feature
- Serverless with AWS NodeJS 10.x runtime
- TypeScript
- DynamoDB
- Offline + DynamoDB local

# Rest APIs
List `GET /todos`

Create `POST /todos`

Read `GET /todos/{id}`

Update `PUT /todos/{id}`

Delete `DELETE /todos/{id}`

# Getting started

Run following command

```
//Start local dynamoDB with migration
serverless dynamodb start --migrate

//Start offline serverless
serverless offline start
```
