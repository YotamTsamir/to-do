'use strict'

function onInit() {
    console.log('Init')
    renderTodos()
}

function renderTodos() {
    const todos = getTodosForDisplay()
    const elTodos = document.querySelector('.todo-list')
    const strHTMLs = todos.map(todo => `
    <li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
        ${todo.txt}
        <button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
    </li>`)

    elTodos.innerHTML = strHTMLs.join('')
    if (gFilterBy === 'active' && !elTodos.innerText) {
        elTodos.innerText = 'no active Todos!'
    } else if (!elTodos.innerText && gFilterBy === 'done') {
        elTodos.innerText = 'no Done Todos!'
    } else if(!elTodos.innerText && !gFilterBy) elTodos.innerText = 'no Todos!'
    document.querySelector('.total-count').innerText = getTodosCount()
    document.querySelector('.active-count').innerText = getActiveTodosCount()

}

function onAddTodo(ev) {
    ev.preventDefault()

    const elTxt = document.querySelector('input[name=txt]')
    const elImp = document.querySelector('input[name=imp]')
    if (!elTxt.value) return;
    addTodo(elTxt.value, elImp.value)
    renderTodos()

    elTxt.value = ''
    elImp.value = ''
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    if(confirm('are you sure?')){
    console.log('Removing', todoId)

    removeTodo(todoId)
    renderTodos()}
    else console.log('you chose not to delete')
}
function onToggleTodo(todoId) {
    console.log('Toggling', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onSetFilter(filterBy) {
    console.log('Filtering by: ', filterBy);
    setFilter(filterBy)
    renderTodos()
}
function onSortToDo(sortBy) {
    console.log('sorting by: ', sortBy);
    setSort(sortBy)
    renderTodos()

}