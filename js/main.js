import {
  tasks,
  addTask,
  deleteTask,
  toggleTask,
  editTask,
  updateTaskStatus
} from "./modules/tasks.js";

import { renderTasks } from "./ui/render.js";

import {
  saveTasks,
  loadTasks
} from "./data/storage.js";

const modal = document.querySelector(".modal");

const addTaskBtn = document.querySelector(".add-task-btn");

const form = document.querySelector("#task-form");

const searchInput = document.querySelector("#search-input");

const filterPriority = document.querySelector("#filter-priority");

const themeToggle = document.querySelector("#theme-toggle");

const toast = document.querySelector(".toast");

tasks.push(...loadTasks());

updateUI();

addTaskBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

modal.addEventListener("click", (event) => {

  if (event.target === modal) {
    modal.classList.add("hidden");
  }

});

form.addEventListener("submit", (event) => {

  event.preventDefault();

  const title = document.querySelector("#task-title").value;

  const priority = document.querySelector("#task-priority").value;

  const date = document.querySelector("#task-date").value;

  const category = document.querySelector("#task-category").value;

  addTask(title, priority, date, category);

  showToast("Task created");

  updateUI();

  form.reset();

  modal.classList.add("hidden");

});

document.addEventListener("click", (event) => {

  const id = Number(event.target.dataset.id);

  if (event.target.classList.contains("delete-btn")) {

    deleteTask(id);

    showToast("Task deleted");

    updateUI();

  }

  if (event.target.classList.contains("complete-btn")) {

    toggleTask(id);

    showToast("Task updated");

    updateUI();

  }

  if (event.target.classList.contains("edit-btn")) {

    const newTitle = prompt("Edit task:");

    if (newTitle) {

      editTask(id, newTitle);

      showToast("Task edited");

      updateUI();

    }

  }

});

searchInput.addEventListener("input", updateUI);

filterPriority.addEventListener("change", updateUI);

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("light-mode");

});
document.addEventListener("dragstart", (event) => {

  if (event.target.classList.contains("kanban-card")) {

    event.target.classList.add("dragging");

  }

});

document.addEventListener("dragend", (event) => {

  if (event.target.classList.contains("kanban-card")) {

    event.target.classList.remove("dragging");

  }

});

const kanbanColumns =
  document.querySelectorAll(".kanban-tasks");

kanbanColumns.forEach(column => {

  column.addEventListener("dragover", (event) => {

    event.preventDefault();

    const draggingCard =
      document.querySelector(".dragging");

    column.appendChild(draggingCard);

  });

  column.addEventListener("drop", () => {

    const draggingCard =
      document.querySelector(".dragging");

    const id = Number(draggingCard.dataset.id);

    const status = column.dataset.status;

    updateTaskStatus(id, status);

    saveTasks(tasks);

  });

});

function updateUI() {

  let filteredTasks = [...tasks];

  const search = searchInput.value.toLowerCase();

  const priority = filterPriority.value;

  filteredTasks = filteredTasks.filter(task =>
    task.title.toLowerCase().includes(search)
  );

  if (priority !== "All") {

    filteredTasks = filteredTasks.filter(task =>
      task.priority === priority
    );

  }

  renderTasks(filteredTasks);

  saveTasks(tasks);

  updateCards();

}

function updateCards() {

  const completedTasks = tasks.filter(task => task.completed);

  const pendingTasks = tasks.filter(task => !task.completed);

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks.length / tasks.length) * 100);

  document.querySelector("#completed-count").textContent =
    completedTasks.length;

  document.querySelector("#pending-count").textContent =
    pendingTasks.length;

  document.querySelector("#progress-count").textContent =
    `${progress}%`;

}

function showToast(message) {

  toast.textContent = message;

  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 2000);

}