export function renderTasks(tasks) {

  renderTaskList(tasks);

  renderKanban(tasks);

}

function renderTaskList(tasks) {

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

        <div class="task-meta">

          <span class="priority ${task.priority.toLowerCase()}">
            ${task.priority}
          </span>

          <span class="task-category">
            ${task.category || "General"}
          </span>

          <span class="task-date">
            ${task.date || "No date"}
          </span>

        </div>

      </div>

      <div class="task-actions">

        <button class="edit-btn" data-id="${task.id}">
          ✏
        </button>

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

function renderKanban(tasks) {

  const columns = document.querySelectorAll(".kanban-tasks");

  columns.forEach(column => {
    column.innerHTML = "";
  });

  tasks.forEach(task => {

    const column = document.querySelector(
      `[data-status="${task.status}"]`
    );

    const card = document.createElement("div");

    card.classList.add("kanban-card");

    card.setAttribute("draggable", true);

    card.dataset.id = task.id;

    card.innerHTML = `
      <h3>${task.title}</h3>

      <span class="priority ${task.priority.toLowerCase()}">
        ${task.priority}
      </span>
    `;

    column.appendChild(card);

  });

}