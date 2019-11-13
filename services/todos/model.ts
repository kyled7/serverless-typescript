require('dotenv').config();
import Database from "../../libs/database";

const TodoDB = new Database(process.env.MONGODB_URL, process.env.MONGODB_DB, process.env.MONGODB_COLLECTION_TODO)
export default TodoDB

export interface Todo {
  title: string,
  description?: string,
  completed: boolean
}

export const validate = (data: Todo) : boolean => {
  if (!data.title || !data.completed) {
    return false
  }
  if (data.title.length > 10) {
    return false
  }
  return true
}