import { ChevronLeftIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../components/Title";
import { useContext, useEffect, useState } from "react";
import { TasksContext } from "../context/TasksContext";
import Input from "../components/Input";

function TaskPage() {
  const { tasks, setTasks } = useContext(TasksContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updatedTask, SetUpdatedTask] = useState(false);

  useEffect(() => {
    console.log(tasks);
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
    console.log(task);
  }, [tasks, id]);

  function onEditTaskClick(newTitle, newDescription) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, title: newTitle, description: newDescription };
      }
      return task;
    });
    SetUpdatedTask(false);
    setTasks(updatedTasks);
  }

  function onDeleteTaskClick(taskId) {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    navigate("/");
    alert("Tarefa deletada com sucesso!");
  }

  return (
    <div className="h-screen w-screen bg-slate-500 p-6 flex">
      <div className="w-[500px] mx-auto space-y-4">
        <div className="flex mb-6 justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-slate-100 hover:text-slate-300"
            title="Voltar"
          >
            <ChevronLeftIcon />
          </button>
          <Title>Detalhes da Tarefas</Title>
          <div className="flex gap-3">
            <button
              onClick={() => SetUpdatedTask(!updatedTask)}
              className="bg-slate-200 p-2 rounded-md hover:bg-slate-400 hover:text-white"
              title="Editar Tarefa"
            >
              <PencilIcon />
            </button>
            <button
              onClick={() => onDeleteTaskClick(id)}
              className="bg-slate-200 p-2 rounded-md hover:bg-slate-400 hover:text-white"
              title="Excluir Tarefa"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
        <div className="bg-slate-200 p-4 rounded-md">
          {updatedTask ? (
            <div className="mb-3">
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
          ) : (
            <h2 className="text-xl text-slate-600 font-bold mb-2">{title}</h2>
          )}
          {updatedTask ? "" : <hr className="border-slate-400 mb-5" />}

          {updatedTask ? (
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          ) : (
            <p className="text-slate-600">{description}</p>
          )}

          {updatedTask ? (
            <div className="w-full flex gap-2 justify-between">
              <button
                onClick={() => onEditTaskClick(title, description)}
                className="bg-slate-600 text-white p-2 rounded-md hover:bg-slate-700 mt-3 w-full"
              >
                Confirmar
              </button>
              <button
                onClick={() => SetUpdatedTask(false)}
                className="bg-slate-400 text-white p-2 rounded-md hover:bg-slate-500 mt-3 w-full"
              >
                Cancelar
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
