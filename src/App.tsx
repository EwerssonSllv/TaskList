import { useState } from "react"

export default function App() {
  const [taskName, setTaskName] = useState('')
  const [task, setTask] = useState<string[]>([])

  const [editTask, setEditTask] = useState({
    enabled: false,
    task: ''
  })

  function handleRegister() {
    if (!taskName) {
      alert("Enter the name of the task")
      return;
    }

    if(editTask.enabled){
      handleSaveEdit();
      return
    }

    setTask(tasks => [...tasks, taskName])
    setTaskName("")
  }

  function handleSaveEdit(){
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
    setTaskName(item)
    setEditTask({
      enabled: true,
      task: item
    })
  }

  return (
    <div>
      <h1>Task list</h1>
      <input placeholder="Enter the name of the task..." value={taskName} onChange={(e) => setTaskName(e.target.value)} />
      <button onClick={handleRegister}>
        {editTask.enabled ? "Update task" : "Add task"}
      </button>
      <hr />
      {task.map((item) => (
        <section key={item}>
          <span>{item}</span>
          <button onClick={() => handleEdit(item)}>Edit Task</button>
          <button onClick={() => handleDelete(item)}>Delete task</button>
        </section>
      )
      )}
    </div>
  )

}