import { crearTodoHMTL,  } from "./js/components.js";
import {Todo, TodoList} from './classes';
import './style.css'


export const todoList = new TodoList();

todoList.todos.forEach(element => {
    crearTodoHMTL(element)
});


console.log(todoList.todos)
