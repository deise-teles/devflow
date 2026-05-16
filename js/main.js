import {
  tasks,
  addTask,
  deleteTask,
  toggleTask
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

  addTask(title, priority);

  showToast();

  updateUI();

  form.reset();

  modal.classList.add("hidden");

});

document.addEventListener("click", (event) => {

  if (event.target.classList.contains("delete-btn")) {

    const id = Number(event.target.dataset.id);

    deleteTask(id);

    updateUI();

  }

  if (event.target.classList.contains("complete-btn")) {

    const id = Number(event.target.dataset.id);

    toggleTask(id);

    updateUI();

  }

});

searchInput.addEventListener("input", updateUI);

filterPriority.addEventListener("change", updateUI);

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("light-mode");

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

  document.querySelector("#completed-count").textContent =
    completedTasks.length;

  document.querySelector("#pending-count").textContent =
    pendingTasks.length;

}

function showToast() {

  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 2000);

}