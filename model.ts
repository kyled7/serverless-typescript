require('dotenv').config();
import Database from "../../libs/database";

const DB = new Database(process.env.DYNAMODB_TABLE)
export default DB
