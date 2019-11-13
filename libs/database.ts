import { MongoClient, Collection, ObjectId } from "mongodb";

export default class Database {
  uri: string
  dbName: string
  collectionName: string
  client: MongoClient
  collection: Collection
  
  constructor(uri: string, dbName?: string, collectionName?: string ) {
    this.uri = uri
    this.dbName = dbName
    this.collectionName = collectionName
    this.client = new MongoClient(this.uri);
  }

  private getCollection = async () => {
    if (this.collection) {
      return this.collection
    }

    await this.client.connect().then((client) => {
      this.collection = client.db(this.dbName).collection(this.collectionName);
    })
    return this.collection
  }

  list = async (query?: any) : Promise<any> => {
    const collection : Collection = await this.getCollection()
    return collection.find(query).toArray()
  }

  create = async (data: any) : Promise<any> => {
    const collection : Collection = await this.getCollection()
    return collection.insertOne(data)
      .then((result) => {
        return result.insertedId
      })
  }

  read = async (id: string) : Promise<any> => {
    const collection : Collection = await this.getCollection()
    return collection.findOne({"_id" : new ObjectId(id)})
  }

  update = async (id: string, data: any) : Promise<boolean> => {
    const collection : Collection = await this.getCollection()
    return collection.updateOne({"_id": new ObjectId(id)}, {"$set": data})
      .then((result) => {
        return result.result.ok === 1
      })
  }

  delete = async (id: string) : Promise<boolean> => {
    const collection : Collection = await this.getCollection()
    return collection.deleteOne({"_id": new ObjectId(id)})
      .then((result) => {
        return result.result.ok === 1
      })
  }
  
}