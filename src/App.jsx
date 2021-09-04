import React, {Fragment, useState, useRef, useEffect} from "react";
import { v4 as uuidv1 } from 'uuid';
import { TodoList } from "./components/TodoList";

const KEY = 'todosApp.todos';
export default function App(){
    //[name, setItems] = useState
    const [todos, setTodos] = useState([
         
    ]);

    const todoTask = useRef();
    //recuperando datos  de local storage
    useEffect(() => {
        const storedData = JSON.parse( localStorage.getItem(KEY) );
        if(storedData)
        {
            setTodos(storedData);
        }

    }, []);

    //seguimiento de cambios y local storage
    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos) );
    }, [todos]);

    //modificando el estado de un elemento
    const toggleTodo = (id) =>{
        const newTodos = [...todos];
        const todo = newTodos.find((todo)=> todo.id == id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }

    //agregando un elemento
    const todoAdd = () =>{
        const task = todoTask.current.value;
        if(task == "")return;

        setTodos((prevTodos)=>{
            return [...prevTodos, 
                {id:uuidv1(), task}]
        });

        todoTask.current.value ="";
    };
    
    //eliminando un elemento
    const todoClear = (id) =>{ 
        const newTodos = todos.filter((todo)=> !todo.completed);
        setTodos(newTodos);
    };

    return (
        <Fragment>
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
            <input ref={todoTask} type="text" placeholder="Nueva Tarea" />
            <button onClick={todoAdd}>Agregar</button>
            <button onClick={todoClear}>Eliminar</button>
            <div>Te quedan {todos.filter( (todo) => !todo.completed).length} tareas por terminar</div>
        </Fragment> 
    );
}