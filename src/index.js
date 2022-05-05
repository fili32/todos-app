// Set up index.html to load the bundle
// Make sure to load uuid via an npm module when necessary

// --

// Add necessary imports
import { getFilters, setFilters } from './filters'
import { renderTodos } from './views'
import { createTodo, loadTodos } from './todos'

// Render initial todos
renderTodos()
// Set up search text handler
document.querySelector("#filter").addEventListener("input", () => {
    const searchText = document.querySelector("#filter").value
    setFilters({
        searchText
    })
    renderTodos()
})
// Set up checkbox handler
document.querySelector("#hideCompleted").addEventListener('change', (e) => {
    const hideCompleted = e.target.checked
    const filters = getFilters()
    filters.hideCompleted = hideCompleted
    setFilters({
        hideCompleted
    })
    renderTodos()
})
// Set up form submission handler
document.querySelector("#new-todo").addEventListener('submit', (e) => {
    e.preventDefault()
    const todoText = e.target.todoText.value.trim()
    if (todoText.length > 0) {
        createTodo(todoText)
        renderTodos()
        e.target.todoText.value = ''
    }
})

// a watcher for local storage
window.addEventListener('storage', function(e) {
    if (e.key === 'todos') {
        loadTodos()
        renderTodos()
    }
})
