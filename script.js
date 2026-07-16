import { saveTodosIntoLocalStorage,
    getTodosFromLocalStorage } from './utils.js'


const addTodoInput = document.querySelector('[data-add-todo-input]')
const addTodoBtn = document.querySelector('[data-add-todo-btn]')
const todoContainer = document.querySelector('[data-todo-container]');
const todoTemplate = document.querySelector('[data-todo-template]');
const searchTodoInput = document.querySelector('[data-search-todo-input]');


let todoList = getTodosFromLocalStorage();
let filteredTodoList = [];

addTodoBtn.addEventListener('click', ()=> {
    if (addTodoInput.value.trim()){
        const newTodo = {
            id: Date.now(),
            text: addTodoInput.value.trim(),
            completed: false,
            createdAt: new Date()
        }
        todoList.push(newTodo);
        addTodoInput.value = '';
        saveTodosIntoLocalStorage(todoList);
        renderTodos();
    }
})


    addTodoInput.addEventListener('input', () =>{
        if (searchTodoInput.value.trim()){
            searchTodoInput.value = '';
            renderTodos();
        }
    })

    searchTodoInput.addEventListener('input', (e) =>{
        const searchValue = e.target.value.trim();

        filterAndRenderFilteredTodo(searchValue);
        renderFilteredTodos();
    
    })
    const filterAndRenderFilteredTodo = (searchValue) => {
        filteredTodoList = todoList.filter((t) => {
        return t.text.includes(searchValue);
        })
        renderFilteredTodos();
    }

const createTodoLayout = (todo) =>{
    const todoElement = document.importNode(todoTemplate.content, true);

    const checkbox = todoElement.querySelector('[data-todo-checkbox]');
    checkbox.checked = todo.completed;

    const todoText = todoElement.querySelector('[data-todo-text]');
    todoText.textContent = todo.text;

    const todoDate = todoElement.querySelector('[data-todo-date]');
    todoDate.textContent = new Date(todo.createdAt).toLocaleString('ru-RU');

    const todoRemove = todoElement.querySelector('[data-remove-todo]');
    todoRemove.disabled = !todo.completed;

    checkbox.addEventListener('change', (e) => {
        todoList = todoList.map((t)=> {
            if(t.id === todo.id){
                t.completed = e.target.checked;
            }
            return t;
        })
        saveTodosIntoLocalStorage(todoList);

        if (searchTodoInput.value.trim()){
          filterAndRenderFilteredTodo(searchTodoInput.value.trim());
        }
        else {
            renderTodos();}
    })

    todoRemove.addEventListener("click", () =>{
        todoList = todoList.filter((t) =>{
            if (t.id !== todo.id){
                return t
            } 
        })
        saveTodosIntoLocalStorage(todoList);

        if (searchTodoInput.value.trim()){
           filterAndRenderFilteredTodo(searchTodoInput.value.trim());
        }
        else {
            renderTodos();}
    })
    
    return todoElement;
}

const renderFilteredTodos = () =>{
    todoContainer.innerHTML = '';
    if (filteredTodoList.length === 0){
        todoContainer.innerHTML ="<h3>No todos found...</h3>"
        return
    }
    filteredTodoList.forEach((todo) => {
        const todoElement = createTodoLayout(todo);
        todoContainer.append(todoElement);
    })
}


const renderTodos = () =>{
    todoContainer.innerHTML = '';
    if (todoList.length === 0){
        todoContainer.innerHTML ="<h3>No todos...</h3>"
        return
    }
    todoList.forEach((todo) => {
        const todoElement = createTodoLayout(todo);
        todoContainer.append(todoElement);
    })
}

renderTodos();