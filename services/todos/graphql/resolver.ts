import Model from "../model";

const resolver = {
  todos: async () => {
    const data = await Model.list()
    return data
  },
  todo: async (arg: any) => {
    return await Model.read(arg.id)
  },

  create: async (arg: any) => {
    const todo = JSON.parse(JSON.stringify(arg.todo))
    return await Model.create(todo)
  },
  update: async (arg: any) => {
    const { id } = arg
    const todo = JSON.parse(JSON.stringify(arg.todo))
    return await Model.update(id, todo)
  },
  delete: async (arg: any) => {
    await Model.delete(arg.id)
    return "Delete successfully!"
  }
}

export default resolver