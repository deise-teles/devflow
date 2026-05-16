export function renderTasks(tasks) {

  const tasksList = document.querySelector(".tasks-list");

  tasksList.innerHTML = "";

  if (tasks.length === 0) {

    tasksList.innerHTML = `
      <div class="empty-state">
        No tasks found
      </div>
    `;

    return;
  }

  tasks.forEach(task => {

    const taskElement = document.createElement("div");

    taskElement.classList.add("task-item");

    if (task.completed) {
      taskElement.classList.add("completed");
    }

    taskElement.innerHTML = `
      <div class="task-info">

        <h3>${task.title}</h3>

        <span class="priority ${task.priority.toLowerCase()}">
          ${task.priority}
        </span>

      </div>

      <div class="task-actions">

        <button class="complete-btn" data-id="${task.id}">
          ✓
        </button>

        <button class="delete-btn" data-id="${task.id}">
          🗑
        </button>

      </div>
    `;

    tasksList.appendChild(taskElement);

  });

}