const TODOS_KEY = "todos";


export const saveTodosIntoLocalStorage= (todos) => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

export const getTodosFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem(TODOS_KEY)) || [];
}