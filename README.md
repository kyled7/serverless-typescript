# Introduce
Serverless RestAPI example with TypeScript, MongoDB, offline development

# Feature
- RESTful APIs for CRUD operations
- Microservice mono-repo approach
- Serverless with AWS NodeJS 10.x runtime
- TypeScript
- DynamoDB
- Serverless Offline + DynamoDB local (for development)

# Rest APIs
List `GET /todos`

Create `POST /todos`

Read `GET /todos/{id}`

Update `PUT /todos/{id}`

Delete `DELETE /todos/{id}`

# Getting started

Run following command

```
//Install local dynamoDB	
serverless dynamodb install	

//Start local dynamoDB with migration	
serverless dynamodb start --migrate	

//Start offline serverless
serverless offline start
```

After start offline, you should see this information
```
Dynamodb Local Started, Visit: http://localhost:8000/shell	
Serverless: DynamoDB - created table serverless-typescript-dev
Serverless: Starting Offline: dev/us-east-1.

Serverless: Routes for index:
Serverless: GET /todos
Serverless: POST /{apiVersion}/functions/serverless-typescript-dev-index/invocations

Serverless: Routes for create:
Serverless: POST /todos
Serverless: POST /{apiVersion}/functions/serverless-typescript-dev-create/invocations

Serverless: Routes for read:
Serverless: GET /todos/{id}
Serverless: POST /{apiVersion}/functions/serverless-typescript-dev-read/invocations

Serverless: Routes for update:
Serverless: PUT /todos/{id}
Serverless: POST /{apiVersion}/functions/serverless-typescript-dev-update/invocations

Serverless: Routes for delete:
Serverless: DELETE /todos/{id}
Serverless: POST /{apiVersion}/functions/serverless-typescript-dev-delete/invocations

Serverless: Offline [HTTP] listening on http://localhost:3000
Serverless: Enter "rp" to replay the last request
```

# Generate new service
I made a handy command to generate a new service with the template that corresponding to this project.
To generate a new service, run followng command
```
yarn create-service {your-service-name}
```
or
```
npm run create-service {your-service-name}
```
Then you can play with your new generated service!
