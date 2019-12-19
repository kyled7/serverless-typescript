import Dynamo from "../../libs/database";

const TodoDB = new Dynamo(process.env.DYNAMODB_TABLE)
export default TodoDB