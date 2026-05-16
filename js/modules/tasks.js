export let tasks = [];

export function addTask(title, priority) {

  const newTask = {
    id: Date.now(),
    title,
    priority,
    completed: false
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