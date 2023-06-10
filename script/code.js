let tasks = [];
let addBtn = document.querySelector(".add-btn");
let input = document.getElementById("input");
let taskList = document.querySelector(".task-list");


let createTask = (taskT, completed) => {
  if (taskT.trim() === "") {
    return;
  }

  tasks.push({
    taskT,
    completed,
  });

  console.log(tasks);
};

let taskDisplayed = () => {
  if (tasks.length === 0) {
    taskList.textContent = "NO task was added";
    return;
  }

  // To prevent the task from being added twice
  taskList.innerHTML = "";

  // To display the tasks on the HTML
  tasks.forEach((thing) => {
    let completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");
    completeBtn.innerHTML = `${!thing.completed ? `<i class="fa-light fa-square fa-lg"></i>` : "✔✔"}`;

  
    completeBtn.addEventListener("click", () => {
      thing.completed = !thing.completed;
      taskDisplayed();
      saveTasks();
      console.log(tasks);
    });

    let title = document.createElement("span");
    title.classList.add("title-text");
    title.textContent = thing.taskT;
    if (thing.completed) {
      title.style.textDecoration = "line-through";
    }

    let rembtn = document.createElement("button");
    rembtn.classList.add("remove-btn");
    rembtn.innerHTML = ` 
    <i class="fas fa-trash-alt"></i>
`;

    rembtn.addEventListener("click", () => {
      tasks.splice(tasks.indexOf(thing), 1);
      taskDisplayed();
      saveTasks();
    });

    let task = document.createElement("div");
    task.classList.add("tasks");

    let taskTitle = document.createElement("div");
    taskTitle.classList.add("task-title");
    taskTitle.appendChild(completeBtn);
    taskTitle.appendChild(title);
    taskTitle.appendChild(rembtn);

    task.appendChild(taskTitle);
    taskList.appendChild(task);
  });
};

// Add 
addBtn.addEventListener("click", () => {
  let taskT = input.value;
  createTask(taskT, false);
  taskDisplayed();
  saveTasks();

  input.value = "";
});

// Retrieve tasks from local storage
let getTasks = () => {
  let savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    tasks = savedTasks;
  }
};

// Local storage
const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};


getTasks();
taskDisplayed();