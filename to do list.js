const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

let tasks = [];

addTaskBtn.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = '';
    renderTasks();
  }
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskElement = document.createElement('li');
    taskElement.textContent = task.text;
    if (task.completed) {
      taskElement.classList.add('completed');
    }
    taskElement.addEventListener('click', () => {
      task.completed = !task.completed;
      renderTasks();
    });
    taskList.appendChild(taskElement);
  });
}

renderTasks();
// Add event listener to delete button
taskList.addEventListener('click', deleteTask);

function deleteTask(event) {
  if (event.target.classList.contains('delete-btn')) {
    const taskIndex = Array.prototype.indexOf.call(taskList.children, event.target.parentNode);
    tasks.splice(taskIndex, 1);
    renderTasks();
  }
}

// Update the completed counter
function updateCompletedCounter() {
  const completedTasks = tasks.filter(task => task.completed);
  document.getElementById('completed-counter').textContent = `Completed tasks: ${completedTasks.length}`;
}

// Call the updateCompletedCounter function whenever the tasks array changes
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskElement = document.createElement('li');
    taskElement.textContent = task.text;
    if (task.completed) {
      taskElement.classList.add('completed');
    }
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'delete-btn';
    taskElement.appendChild(deleteBtn);
    taskElement.addEventListener('click', () => {
      task.completed = !task.completed;
      renderTasks();
    });
    taskList.appendChild(taskElement);
  });
  updateCompletedCounter();
}

// Call the renderTasks function whenever the tasks array changes
addTaskBtn.addEventListener('click', addTask);
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = '';
    renderTasks();
  }
}

// Initialize the completed counter
updateCompletedCounter();
// Add event listener to task input to allow pressing enter to add task
taskInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Add a function to edit tasks
function editTask(taskIndex) {
  const taskElement = taskList.children[taskIndex];
  const taskText = taskElement.textContent;
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.value = taskText;
  taskElement.textContent = '';
  taskElement.appendChild(editInput);
  editInput.focus();

  editInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      tasks[taskIndex].text = editInput.value.trim();
      taskElement.textContent = tasks[taskIndex].text;
      renderTasks();
    }
  });

  editInput.addEventListener('blur', function() {
    tasks[taskIndex].text = editInput.value.trim();
    taskElement.textContent = tasks[taskIndex].text;
    renderTasks();
  });
}

// Add a double-click event listener to tasks to allow editing
taskList.addEventListener('dblclick', function(event) {
  if (event.target.tagName === 'LI') {
    const taskIndex = Array.prototype.indexOf.call(taskList.children, event.target);
    editTask(taskIndex);
  }
});

// Add a function to filter tasks by completed status
function filterTasks(completed) {
  tasks.forEach((task, index) => {
    const taskElement = taskList.children[index];
    if (task.completed === completed) {
      taskElement.style.display = 'block';
    } else {
      taskElement.style.display = 'none';
    }
  });
}

// Add buttons to filter tasks by completed status
const filterButtons = document.createElement('div');
filterButtons.innerHTML = `
  <button id="show-all-btn">Show All</button>
  <button id="show-completed-btn">Show Completed</button>
  <button id="show-incomplete-btn">Show Incomplete</button>
`;
document.body.appendChild(filterButtons);

document.getElementById('show-all-btn').addEventListener('click', function() {
  tasks.forEach((task, index) => {
    const taskElement = taskList.children[index];
    taskElement.style.display = 'block';
  });
});

document.getElementById('show-completed-btn').addEventListener('click', function() {
  filterTasks(true);
});

document.getElementById('show-incomplete-btn').addEventListener('click', function() {
  filterTasks(false);
});
// Add a function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a function to load tasks from local storage
function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
}

// Call the loadTasks function when the page loads
loadTasks();

// Add a function to clear all tasks
function clearTasks() {
  tasks = [];
  renderTasks();
  saveTasks();
}

// Add a button to clear all tasks
const clearButton = document.createElement('button');
clearButton.textContent = 'Clear All';
clearButton.addEventListener('click', clearTasks);
document.body.appendChild(clearButton);

// Add a function to sort tasks by completed status
function sortTasks() {
  tasks.sort((a, b) => {
    if (a.completed && !b.completed) {
      return 1;
    } else if (!a.completed && b.completed) {
      return -1;
    } else {
      return 0;
    }
  });
  renderTasks();
}

// Add a button to sort tasks by completed status
const sortButton = document.createElement('button');
sortButton.textContent = 'Sort by Completed';
sortButton.addEventListener('click', sortTasks);
document.body.appendChild(sortButton);

// Add a function to display the number of incomplete tasks
function displayIncompleteTasks() {
  const incompleteTasks = tasks.filter(task => !task.completed);
  document.getElementById('incomplete-counter').textContent = `Incomplete tasks: ${incompleteTasks.length}`;
}

// Add a counter to display the number of incomplete tasks
const incompleteCounter = document.createElement('p');
incompleteCounter.id = 'incomplete-counter';
document.body.appendChild(incompleteCounter);

// Call the displayIncompleteTasks function whenever the tasks array changes
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskElement = document.createElement('li');
    taskElement.textContent = task.text;
    if (task.completed) {
      taskElement.classList.add('completed');
    }
    taskElement.addEventListener('click', () => {
      task.completed = !task.completed;
      renderTasks();
    });
    taskList.appendChild(taskElement);
  });
  displayIncompleteTasks();
  saveTasks();
}