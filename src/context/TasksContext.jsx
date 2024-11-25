import { createContext, useEffect, useState } from "react";

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]); // Executa apenas quando "tasks" mudar

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
};
