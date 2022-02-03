const db = require('../database.js');

function alltodolists() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM todo_lists", function (err, row) {
            resolve(row)
        })
    })
}

function updateTodoList(title, color, id) {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE todo_lists SET title = ?, color = ? WHERE id = ?`, [title, color, id], function (error) {
            if (error) {
                reject(error)
            }
            resolve('Todo list updated!')
        })
    })
}

function updateTodo(content, done, id) {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE todos SET content = ?, done = ? WHERE id = ?`,
            [content, done, id],
            function (error) {
                if (error) {
                    reject(error)
                }
                resolve('Todo updated!')
            }
        )
    })
}

function deleteTodoList(id) {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM todo_lists WHERE id = ?`, [id], function (error) {
            if (error) {
                reject(error)
            }
            if (this.changes == 0) { 
                reject({ error: `Todo list with id ${id} not found` })//Ska detta vara return?
            }
            resolve('Todo list deleted!')

        })
    })
}

function newTodoList(title, color) {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO todo_lists(title,color) VALUES (?, ?)`, [title, color], function (error) {
            if (error) {
                reject(error)
            }
            db.get(`SELECT * FROM todo_lists WHERE id = ?`, [this.lastID], function (err, row) {
                if (err) {
                    reject(error)
                }
                resolve(row)
            })
        })
    })
}

function getTodoLists() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM todo_lists`, function (error, rows) {
            if (error) {
                reject(error)
            }
            resolve(rows)
        })
    })
}

function getTodo(id) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM todos WHERE id = ?`, [id], function (error, row) {
            if (error) {
                reject(error)
            }
            resolve(row)
        })
    })
}

function postNewTodo(content, todoListID) {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO todos(content, todo_list_id) VALUES (?,?)`, [content, todoListID], function (error) {
            if (error) {
                reject(error)
            }
            db.get(`SELECT * FROM todos WHERE id = ?`, [this.lastID], function (err, row) {
                if (err) {
                    reject(err)
                }
                resolve(row)
            })
        })
    })
}

module.exports = { 
    getTodo, 
    updateTodoList,
    updateTodo,
    deleteTodoList,
    newTodoList,
    getTodoLists,
    postNewTodo,
    alltodolists
 }
