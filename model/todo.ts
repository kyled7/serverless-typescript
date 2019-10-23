import { Todo } from './todo';
import { DynamoDB } from "aws-sdk";
import { v4 as uuid } from "uuid";

let options = {}

if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  };
}

const dynamoDb = new DynamoDB.DocumentClient(options)

export interface Todo {
  id: string
  title: string,
  completed: boolean,
  created_at: number
  updated_at: number
}

const initTodo = (data: any): Todo => {
  const timestamp = new Date().getTime()
  const todo: Todo = {
    id: data.id || uuid(),
    completed: data.completed || false,
    created_at: data.created_at || timestamp,
    updated_at: data.updated_at || timestamp,
    ...data
  }
  return todo
}

const getParams = (options?: any) => {
  return {
    TableName: process.env.DYNAMODB_TABLE,
    ...options
  }
}

export const list = async (): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    dynamoDb.scan(getParams(), (error, result) => {
      if (error) {
        return reject(error)
      }

      return resolve(result)
    })
  })
}

export const add = async (data: any): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    const todo = initTodo(data);
    const params = getParams({Item: todo});
    dynamoDb.put(params, (error) => {
      if (error) {
        return reject(error);
      }
      return resolve(todo);
    })
  })
}

export const get = async (id: string): Promise<Todo> => {
  return new Promise<Todo>((resolve, reject) => {
    const params = getParams({
      Key: {
        id
      }
    })

    dynamoDb.get(params, (error, result) => {
      if (error) {
        return reject(error);
      }
      console.log(Object.keys(result).length)
      if (Object.keys(result).length === 0) {
        return reject({statusCode: 404, message: "Not found!"})
      }

      return resolve(initTodo(result.Item));
    })
  })
}

export const update = async (id: string, data: any): Promise<Todo> => {
  return new Promise<Todo>((resolve, reject) => {
    const params = getParams({
      Key: {
        id
      },
      ExpressionAttributeValues: {
        ':title': data.title,
        ':completed': data.completed,
        ':updated_at': new Date().getTime(),
      },
      UpdateExpression: 'SET title = :title, completed = :completed, updated_at = :updated_at',
      ReturnValues: 'ALL_NEW',
    })

    dynamoDb.update(params, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(initTodo(result.Attributes));
    })
  })
}

export const deleteTodo = async (id: string): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    const params = getParams({
      Key: {
        id
      }
    })

    dynamoDb.delete(params, (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    })
  })
}