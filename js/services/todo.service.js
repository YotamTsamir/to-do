'use strict'
console.log('Hi');

var gTodos = []
_createTodos()

var gFilterBy = ''
var gSortBy = 'timeAt'


function getTodosForDisplay() {
    if (!gFilterBy) return _sortTodos(gTodos);
    const todos = gTodos.filter(todo =>
        todo.isDone && gFilterBy === 'done' ||
        !todo.isDone && gFilterBy === 'active'
    )
    return _sortTodos(todos)
    // return todos
}

function getTodosCount() {
    return gTodos.length
}
function getActiveTodosCount() {
    const activeTodos = gTodos.filter(todo => !todo.isDone)
    return activeTodos.length
}

function removeTodo(todoId) {
    const idx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(idx, 1)
    _saveTodosToStorage()

}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}


function addTodo(txt, imp) {
    const todo = _createTodo(txt, imp)
    gTodos.push(todo)
    _saveTodosToStorage()
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}
function setSort(sortBy) {
    gSortBy = sortBy
}

function _createTodos() {
    var todos = loadFromStorage('todoDB')
    if (!todos || !todos.length) {
        todos = [_createTodo('Do the dishes', '1'), _createTodo('Learn Javascript', '2')]
    }
    gTodos = todos
    _saveTodosToStorage()
}
function _sortTodos(todos) {
    if (gSortBy === 'imp') {
        todos.sort((a, b) => { return a.imp - b.imp })
        return todos
    } else if (gSortBy === 'timeAt') {
        todos.sort((a, b) => { return a.timeAt - b.timeAt })
        return todos
    } else {
      return todos.sort((a, b) => {
            const nameA = a.txt.toUpperCase();
            const nameB = b.txt.toUpperCase();
            if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
            });
        }
        // return todos
    }


function _createTodo(txt, imp) {
    return {
        id: _makeId(),
        txt,
        isDone: false,
        timeAt: Date.now(),
        imp: parseInt(imp)
    }
}

function _saveTodosToStorage() {
    saveToStorage('todoDB', gTodos)
}

function _makeId(length = 5) {
    var txt = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

