import React, { useState, useRef, useEffect } from "react"; // Para poder almacenar valores, y no eliminarlos cada vez que react guarde y aplique cambios
import TodoList from "./TodoList"; // IMPORTA COMPONENTE CREADO
// import uuidv4 from 'uuid/v4'
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  // const [todos, setTodos] = useState([{id: 1, name: 'Todo 1', complete: false}]); // object destructuring
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // FUNCIÓN PARA GUARDAR CHECK
  function toggleTodo(id) {
    const newTodos = [...todos]; // CREA UNA COPIA DEL PARAMETRO TODOS
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    // console.log(name);
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  // FUNCIÓN PARA LIMPIAR LISTADO DE TODOS
  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    // UN RETURN, SOLO PUEDE RETORNAR UN ELEMENTO, HTML O UN ELEMENTO DE REACT
    // REFERENCIA A COMPONENTE CREADO
    <>
      {/* fragmento, para incluir dos elementos en el return */}
      {/* Paso de parametros*/}
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text"></input>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed Todos</button>
      <div>{todos.filter((todo) => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
