const crud = require('../Database/Modules/crud')

const alltodolists = async (req, res) => {
    const result = await crud.alltodolists()
    res.json(result)
}

const newtodolist = async (req, res) => {
    const { title, color } = req.body
    if (!(title || color)) {
        return res.status(400).json({ error: "Invalid body" })
    }
    const result = await crud.newTodoList(title, color)
    res.json(result)
}

const newtodo = async (req, res) => {
    const { todoListID, content } = req.body
    if (!(todoListID || content)) {
        return res.status(400).json({ error: 'Invalid body' })
    }
    const result = await crud.postNewTodo(content, todoListID)
    res.json(result)
}

const gettodolist = async (req, res) => {
    const result = await crud.getTodoLists()
    res.json(result)
}

const gettodo = async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ error: 'Invalid body' })
    }
    const result = await crud.getTodo(id)
    res.json(result)
}

const updatetodolist = async (req, res) => {
    const { id, title, color } = req.body
    if (!(id || title || color)) {
        return res.status(400).json({ error: 'Invalid body' })
    }
    try {
        const result = await crud.updateTodoList(title, color, id)
        res.json(result)
    }
    catch (error) {
        res.json(error)
    }
}

const updatetodo = async (req, res) => {
    const { id, content, done } = req.body
    if (!(id || content || done)) {
        return res.status(400).json({ error: "Invalid body" })
    }
    const result = await crud.updateTodo(content, done, id)
    res.json(result)
}

const deletetodolist = async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ error: 'Invalid body, missing id' })
    }
    try {
        const result = await crud.deleteTodoList(id)
        res.json(result)
    }
    catch (error) {
        res.json(error)
    }

}

module.exports = {
    alltodolists,
    newtodolist,
    newtodo,
    gettodolist,
    gettodo,
    updatetodolist,
    updatetodo,
    deletetodolist
}