import { getFilters } from './filters'
import { getTodos, removeTodo, saveTodos, checkTodo } from './todos'

// Render application todos based on filters
const renderTodos = () => {
    const todos = getTodos()
    const {searchText, hideCompleted } = getFilters()
    const listTodos = todos.filter((todo) => {
        const textFilter = todo.text.toLowerCase().includes(searchText.toLowerCase())
        const completedFilter = !hideCompleted || !todo.completed
        return textFilter && completedFilter
    })
    generateSummaryDOM(listTodos)
    if(todos.length > 0) {
        listTodos.forEach(todo =>  generateTodoDOM(todo))
    } else {
        const emptyEl = document.createElement('p')
        emptyEl.classList.add('empty-message')
        emptyEl.textContent = 'No to-dos to show'
        document.querySelector('#allTodo').appendChild(emptyEl)
    }
   
}
// generateTodoDOM
// Arguments: todo
// Return value: the todo element
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement("label")
    const containerEl = document.createElement('div')
    const todoCompleted = document.createElement("input")
    const todoRemove = document.createElement("button")
    const todoText = document.createElement("span")
    if(!todo.text.trim()){
        return
    }

    let newContent = document.createTextNode(todo.text)
    todoEl.appendChild(containerEl)
    todoText.appendChild(newContent)

    let todoRemoveContent = document.createTextNode("remove")
    todoRemove.classList.add('button', 'button--text')
    todoRemove.appendChild(todoRemoveContent)
    // set up the remove button
    todoRemove.addEventListener('click', () => {
        const id = todo.id
        removeTodo(id)
        saveTodos()
        renderTodos()
    })

    document.querySelector("#allTodo").appendChild(todoEl)
    todoCompleted.setAttribute("type", "checkbox")
  
    if(todo.completed) {
        todoCompleted.checked = true
    }
    containerEl.appendChild(todoCompleted)
    // set up the 'hide completed' checkbox
    todoCompleted.addEventListener('change', () => {
        const id = todo.id
        checkTodo(id)
        saveTodos()
        renderTodos()
    })

    containerEl.appendChild(todoText)
    todoEl.appendChild(todoRemove)
    // set up container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')

    return todoEl
}
// generateSummaryDOM: Get the DOM elements for list summary
// Arguments: incompletedTodos
// Return value: the summary element
const generateSummaryDOM = (listTodos) => {
    let numberOfRestTodos = listTodos.filter(todo  => !todo.completed)
        document.querySelector("#allTodo").innerHTML = ''
    const restTodo = document.createElement("h2")
    restTodo.classList.add('list-title')
    const plural = numberOfRestTodos.length ===1 ? '' : 's'
    restTodo.textContent = `You have ${numberOfRestTodos.length} todo${plural} left.`
    document.querySelector("#allTodo").appendChild(restTodo)
}
// Make sure to set up the exports
export { renderTodos, generateTodoDOM, generateSummaryDOM }