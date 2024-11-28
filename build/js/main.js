// Class representing a task
class Task {
  constructor(title, description, date) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.completed = false;
  }

  /**
   * Toggles the completion status of the task.
   */
  toggleCompleted() {
    this.completed = !this.completed;
  }
}

// Class representing a task manager
class TaskManager {
  constructor() {
    this.tasks = [];
  }

  /**
   * Adds a task to the list and re-renders the list.
   * @param {object} task - The task to add.
   */
  addTask(task) {
    this.tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(this.tasks)); // Save the tasks to localStorage
    this.renderTasks();
  }

  /**
   * Removes a task from the list by its title and re-renders the task list.
   * @param {string} name - The title of the task to be removed.
   */
  removeTask(name) {
    const index = this.tasks.findIndex((task) => task.title === name);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(this.tasks)); // Save the tasks to localStorage
    }
    this.renderTasks();
  }

  /**
   * Marks a task as completed by its title and re-renders the task list.
   * @param {string} name - The title of the task to be marked as completed.
   */
  completeTask(name) {
    const index = this.tasks.findIndex((task) => task.title === name);
    if (index !== -1) {
      this.tasks[index].toggleCompleted();
    }
    this.renderTasks();
  }

  /**
   * Renders the task list in the page.
   * This method is called each time a task is added, removed or completed.
   */
  renderTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    // For each object present in the tasks array, create a formatted table row.
    // Each button has an inline event listener that calls the corresponding method.
    this.tasks.forEach((task) => {
      const row = document.createElement("tr");
      row.classList.add("odd:bg-white", "even:bg-gray-50", "border-b");
      row.innerHTML = `
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        ${task.title}
        </th>
        <td class="px-6 py-4">${task.description}</td>
        <td class="px-6 py-4">${task.date}</td>
        <td class="px-6 py-4">
          ${task.completed ? "Completed" : "Pending"}
        </td>
        <td class="flex gap-4 px-6 py-4">
          <button onclick="taskManager.completeTask('${task.title}')">
            <i class="fa-solid ${task.completed ? "fa-xmark" : "fa-check"}"></i>
          </button>
          <button onclick="taskManager.removeTask('${task.title}')";>
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      `;

      taskList.appendChild(row);
    });
  }
}

/**
 * Checks if the task form fields are filled in. If any of the fields is empty,
 * an alert is shown and the function returns false. Otherwise, it returns true.
 */
function validateInput() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const date = document.getElementById("date").value.trim();

  if (title === "" || description === "" || date === "") {
    alert("Please, fill in all the fields.");
    return false;
  }
  return true;
}

// Create a new instance of the TaskManager class
const taskManager = new TaskManager();

// Load tasks from localStorage
const tasks = JSON.parse(localStorage.getItem("tasks"));
if (tasks) {
  taskManager.tasks = tasks;
  taskManager.renderTasks();
}

// Event listener for the "Add task" button
document.getElementById("add-task").addEventListener("click", () => {
  // Validate the inputs
  if (!validateInput()) {
    return;
  }

  // Get the task details from the input fields
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;

  // Create a new task object and add it to the task list
  const task = new Task(title, description, date);
  taskManager.addTask(task);

  // Clean up the input fields
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("date").value = "";
});
