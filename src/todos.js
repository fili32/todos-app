import { v4 as uuidv4 } from 'uuid'
import { renderTodos } from './views'
import { configure, start, stop, lastStorage } from './storageWatcher'


// Setup the empty todos array
const  todos = []
// loadTodos
// Arguments: none
// Return value: none
const loadTodos = () => {
    const todoJSON = localStorage.getItem('todos')

    try {
        return todoJSON ?  JSON.parse(todoJSON) : []
    } catch(e) {
        return []
    }
}

// saveTodos
// Arguments: none
// Return value: none
const saveTodos = () => {
    // // Configure watcher
    configure({
        verbose: true, // (Bool) Default: true
        duration: 3000, // (Integer) Default: 1500
        logType: 'warn' // (String) Default: 'info'
    })
    
    // Start watcher
    start()
  
    // add to storage to see the watcher's behavior
    localStorage.setItem('todos', JSON.stringify(todos))
    console.log(lastStorage)
    stop()
}

// getTodos
// Arguments: none
// Return value: todos array
const getTodos = () => todos

// createTodo
// Arguments: todo text
// Return value: none
const createTodo = (todoText) => {
    todos.push({
        id: uuidv4(),
        text: todoText,
        completed: false
    })
    saveTodos()
}

// removeTodo
// Arguments: id of todo to remove
// Return value: none
// Remove Todos list
const removeTodo = (id) => {
    const todoToRemoveIndex = todos.findIndex((todo) => todo.id === id)
    if (todoToRemoveIndex > -1) {
        todos.splice(todoToRemoveIndex, 1)
        saveTodos()
    }
 }

// toggleTodo
// Arguments: id of todo to toggle
// Return value: none
const checkTodo = (id) => {
    const todoChecked= todos.find((todo) => todo.id === id)
    if(todoChecked) {
        todoChecked.completed = !todoChecked.completed
        saveTodos()
    }
}

loadTodos()

// Make sure to call loadTodos and setup the exports
export { removeTodo, checkTodo, saveTodos, getTodos, createTodo, loadTodos }