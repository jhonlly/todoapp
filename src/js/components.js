import { Todo } from '../classes'
import { todoList } from '../index'

const divTodoList = document.querySelector('.todo-list');
const inputNuevoTodo = document.querySelector('.new-todo');
const btnBorrarTodo  = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters')
const anchorFiltros = document.querySelector('.filtro')

export const crearTodoHMTL = (todo) => {
    const htmlTodo = ` 
        <li class="${(todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked': ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
        </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

inputNuevoTodo.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 &&  inputNuevoTodo.value.length > 0) {
        const nuevoTodo = new Todo(inputNuevoTodo.value)
        todoList.nuevoTodo(nuevoTodo)
        crearTodoHMTL(nuevoTodo);

        inputNuevoTodo.value = ''
    }
})

divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id')
   
    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId)
        todoElemento.classList.toggle('completed')
        
    }
    if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento)
    }
})

btnBorrarTodo.addEventListener('click', event => {
    todoList.borrarTodosCompletados();

    for (let i = divTodoList.children.length -1; i >= 0; i--) {
        const element = divTodoList.children[i];
        console.log(element);

        if (element.classList.contains('completed')) {
            divTodoList.removeChild(element)
        }
        
    }
})

ulFiltros.addEventListener('click', event => {
    const filtro = event.target.text
    if(!filtro){return}

    for (const element of divTodoList.children) {
        element.classList.remove('hidden');
        const completado = element.classList.contains('completed')
        switch (filtro) {
            case 'Pendientes':
                if(completado){
                    element.classList.add('hidden')
                }
                break;
           case 'Completados':
                if(!completado){
                    element.classList.add('hidden')
                }
                break;
               
               default:
        }
    }
})