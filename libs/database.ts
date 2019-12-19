import { DynamoDB, AWSError } from "aws-sdk";
import { ScanOutput, UpdateItemOutput } from "aws-sdk/clients/dynamodb";
import { v4 as uuid } from "uuid";

export default class Dynamo {
  private tableName: string
  private dynamoDb: DynamoDB.DocumentClient

  constructor(tableName: string) {
    this.tableName = tableName
    let options = {}

    if (process.env.IS_OFFLINE) {
      options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
      };
    }

    this.dynamoDb = new DynamoDB.DocumentClient(options)
  }

  private getParams = (options?: any) => {
    return {
      TableName: this.tableName,
      ...options
    }
  }

  list = async (query?: any): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      let options = {}

      if (query) {
        let conditionExpression: string, ExpressionAttributeValues: any
        for (const key in query) {
          if (query.hasOwnProperty(key)) {
            const value = query[key];
            conditionExpression += `${key} = :${key}, `
            ExpressionAttributeValues[':' + key] = value
          }
        }
        options = {
          KeyConditionExpression: conditionExpression,
        }
      }
      this.dynamoDb.scan(this.getParams(options), (error: AWSError, result: ScanOutput) => {
        if (error) {
          reject(error);
        }
        resolve(result.Items)
      })
    })
  }

  create = async (data: any): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      const params = this.getParams({
        Item: {
          ...data,
          id: data.id || uuid()
        }
      })
      this.dynamoDb.put(params, (error) => {
        if (error) {
          reject(error)
        }
        resolve(params.Item)
      })
    })
  }

  read = async (id: string): Promise<any> => {
    const params = this.getParams({
      Key: { id }
    })
    return this.dynamoDb.get(params)
  }

  update = async (id: string, data: any): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      let options = {}

      let UpdateExpression: string = 'SET ', ExpressionAttributeValues: any = {}
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const value = data[key];
          UpdateExpression += `${key} = :${key}, `
          ExpressionAttributeValues[':' + key] = value
        }
      }
      options = {
        Key: { id },
        ExpressionAttributeValues,
        UpdateExpression: UpdateExpression.slice(0, -2),
        ReturnValues: 'ALL_NEW',
      }

      this.dynamoDb.update(this.getParams(options), (error: AWSError, result: UpdateItemOutput) => {
        if (error) {
          reject(error);
        }
        resolve(result.Attributes)
      })
    })
  }

  delete = async (id: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      const params = this.getParams({
        Key: { id }
      })
  
      this.dynamoDb.delete(params, (error) => {
        if (error) {
          return reject(error);
        }
        return resolve();
      })
    })
  }
}