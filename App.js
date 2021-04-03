import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList';
// import uuidv4 from 'uuid/v4';

const LOCAL_STORAGE_KEY = 'todoApp.todos';
import { v4 as uuidv4 } from 'uuid';
function App(){
    const [todos, setTodos] = useState([]);
    const todoNameRef = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if(storedTodos) setTodos(storedTodos);
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }, [todos])
    // const { v4: uuidv4 } = require('uuid');

    function toggleTodo(id){
        const newTodos = [...todos];
        const todo = newTodos.find(todo => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }

    function handleAddTodo(e){
        const name = todoNameRef.current.value;
        if(name === "") return ;
        setTodos(prevTodos => {
            return [...prevTodos, {id: uuidv4(), name:name, completed:false}];
        });
        todoNameRef.current.value = null;
    }

    function handleClearTodo(){
        const newTodos = todos.filter(todo => !todo.completed);
        setTodos(newTodos);
    }

    return(
        <>
        <TodoList todos={todos} toggleTodo={toggleTodo}/>
        <input ref={todoNameRef} type="text"></input>
        <button onClick={handleAddTodo}>Add To do</button>
        <button onClick={handleClearTodo}>Clear Completed To Dos</button>
        <div>{todos.filter(todo => !todo.completed).length} left To Dos</div>
        </>
    );
}

export default App;