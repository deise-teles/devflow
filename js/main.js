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

function updateUI() {

  renderTasks(tasks);

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