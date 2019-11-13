require('dotenv').config();
import Database from "../../libs/database";

const DB = new Database(process.env.MONGODB_URL, process.env.MONGODB_DB, process.env.MONGODB_COLLECTION)
export default DB

export interface YourObject {
  title: string,
  description?: string
}

export const validate = (data: YourObject) : boolean => {
  //Write your validation here
  if (!data.title) {
    return false
  }
  if (data.title.length > 10) {
    return false
  }
  return true
}