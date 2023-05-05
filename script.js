// Selecting the required elements
const inputElement = document.querySelector("input");
const addBtn = document.querySelector(".input-wrapper button");
const pendingTasksList = document.querySelector(".pending-tasks ul");
const completedTasksList = document.querySelector(".completed-tasks ul");

// Adding a new task
addBtn.addEventListener("click", () => {
  // Get the value of the input field and trim any whitespace
  const task = inputElement.value.trim();

  if (task !== "") {
    // Create a new list item
    const newTask = document.createElement("li");
    newTask.innerHTML = `
      <span>${task}</span>
      <div>
        <button class="complete-btn">Complete</button>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    // Add the new task to the pending list
    pendingTasksList.appendChild(newTask);

    // Clear the input field
    inputElement.value = "";

    // Set up event listeners for the new task
    setUpTask(newTask);
  }
});

// Set up event listeners for a task
function setUpTask(task) {
  // Complete task
  const completeBtn = task.querySelector(".complete-btn");
  completeBtn.addEventListener("click", () => {
    // Move task to completed list
    completedTasksList.appendChild(task);
    // Remove the "Complete" button
    task.querySelector(".complete-btn").remove();
    // Add "Restore" button to completed task
    const restoreBtn = document.createElement("button");
    restoreBtn.classList.add("restore-btn");
    restoreBtn.innerText = "Restore";
    task.querySelector("div").appendChild(restoreBtn);
    // Set up event listener for restore button
    restoreBtn.addEventListener("click", () => {
      // Move task back to pending list
      pendingTasksList.appendChild(task);
      // Remove the "Restore" button
      task.querySelector(".restore-btn").remove();
      // Add "Complete" button back to pending task
      const completeBtn = document.createElement("button");
      completeBtn.classList.add("complete-btn");
      completeBtn.innerText = "Complete";
      task.querySelector("div").appendChild(completeBtn);
      // Set up event listener for complete button
      setUpTask(task);
    });
    // Remove the "Edit" button
    task.querySelector(".edit-btn").remove();
    // Remove the "Delete" button
    task.querySelector(".delete-btn").remove();
  });

  // Edit task
  const editBtn = task.querySelector(".edit-btn");
  const span = task.querySelector("span");
  editBtn.addEventListener("click", () => {
    const currentTask = span.innerText;
    const newTask = prompt("Edit Task", currentTask);
    if (newTask !== null && newTask !== "") {
      span.innerText = newTask.trim();
    }
  });

  // Delete task
  const deleteBtn = task.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    task.remove();
  });
  
}
