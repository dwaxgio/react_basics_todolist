import React from "react";
import Todo from "./Todo";

export default function TodoList({ todos, toggleTodo }) {
  return (
    // <div>
    //     {/* recibir parametro, para manejarlo en componente */}
    //     {todos.length}
    // </div>

    todos.map((todo) => {
      return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />;
    })
  );
}
