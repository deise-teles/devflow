export function saveTasks(tasks) {
  localStorage.setItem("devflow_tasks", JSON.stringify(tasks));
}

export function loadTasks() {

  const data = localStorage.getItem("devflow_tasks");

  return data ? JSON.parse(data) : [];

}