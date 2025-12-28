import { useEffect, useState, useRef, useMemo, useCallback } from "react"


export default function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const fistRender = useRef(true)
  const [taskName, setTaskName] = useState('')
  const [task, setTask] = useState<string[]>([])

  const [editTask, setEditTask] = useState({
    enabled: false,
    task: ''
  })


  useEffect(() => {

    const savedTasks = localStorage.getItem("@course")
    if (savedTasks) {
      setTask(JSON.parse(savedTasks))
    }

  }, [])

  useEffect(() => {

    if (fistRender.current) {
      fistRender.current = false
      return
    }

    localStorage.setItem("@course", JSON.stringify(task))

  }, [task])

  const handleRegister = useCallback(() => {
    if (!taskName) {
      alert("Enter the name of the task")
      return;
    }
    if (editTask.enabled) {
      handleSaveEdit();
      return
    }
    setTask(tasks => [...tasks, taskName])


  }, [taskName, task])

  function handleSaveEdit() {
    const findIndexTask = task.findIndex(task => task === editTask.task)
    const allTasks = [...task];
    allTasks[findIndexTask] = taskName
    setTask(allTasks)

    setEditTask({
      enabled: false,
      task: ''
    })
  }

  function handleDelete(item: string) {
    const removeTask = task.filter(task => task !== item)
    setTask(removeTask)

  }

  function handleEdit(item: string) {
    inputRef.current?.focus()
    setTaskName(item)
    setEditTask({
      enabled: true,
      task: item
    })
  }

  const totalTasks = useMemo(() => {
    return task.length
  }, [task])

  return (
    <div>
      <main className="container">
        <h1 className="title">Task list</h1>
        <input
          className="input"
          placeholder="Enter the name of the task..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          ref={inputRef}
        />
        <button onClick={handleRegister} className="button">
          {editTask.enabled ? "Update task" : "Add task"}
        </button>
        <hr />
        <strong>Você tem {totalTasks} tarefas</strong>
        <br /><br />
        {task.map((item) => (
          <section key={item} className="tasks">
            <span>{item}</span>
            <button onClick={() => handleEdit(item)} className="editTask">Edit Task</button>
            <button onClick={() => handleDelete(item)} className="deleteTask">Delete task</button>
          </section>
        )
        )}
      </main>
    </div>
  )

}