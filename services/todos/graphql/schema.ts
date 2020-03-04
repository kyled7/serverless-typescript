const schema = /* GraphQL */`
type Todo {
  id: ID!
  title: String!
  completed: Boolean
}

input TodoInput {
  title: String!
  completed: Boolean
}

type Query {
  "Get list todos"
  todos: [Todo]
  "Get a todo by id"
  todo(id: String!): Todo
}
type Mutation {
  create(todo: TodoInput): Todo
  update(id: ID!, todo: TodoInput): Todo
  delete(id: ID!): String
}
`

export default schema
