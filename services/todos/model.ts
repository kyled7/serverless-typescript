import Dynamo from "../../libs/dynamodb";

const TodoDB = new Dynamo(process.env.DYNAMODB_TABLE)
export default TodoDB