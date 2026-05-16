export let tasks = [];

export function addTask(title, priority, date, category) {

  const newTask = {
    id: Date.now(),
    title,
    priority,
    date,
    category,
    completed: false,
    status: "todo"
  };

  tasks.push(newTask);

  return newTask;
}

export function deleteTask(id) {

  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
  }

}

export function toggleTask(id) {

  const task = tasks.find(task => task.id === id);

  if (task) {
    task.completed = !task.completed;
  }

}

export function editTask(id, newTitle) {

  const task = tasks.find(task => task.id === id);

  if (task) {
    task.title = newTitle;
  }

}

export function updateTaskStatus(id, status) {

  const task = tasks.find(task => task.id === id);

  if (task) {
    task.status = status;
  }

}