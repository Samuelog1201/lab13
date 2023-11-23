document.addEventListener("DOMContentLoaded", function () {
    displayTasks();
});

function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const task = { text: taskText, status: "To Do" };
        saveTask(task);
        displayTasks();
        taskInput.value = "";
    }
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function displayTasks() {
    const tasksContainer = document.getElementById("tasks-container");
    tasksContainer.innerHTML = "";

    const completingSection = document.getElementById("completing-section");
    completingSection.innerHTML = "<h2>Completando</h2>";

    const completedSection = document.getElementById("completed-section");
    completedSection.innerHTML = "<h2>Completadas</h2>";

    const tasks = loadTasks();
    for (const task of tasks) {
        displayTask(task);
    }
}

function displayTask(task) {
    const tasksContainer = document.getElementById("tasks-container");
    const completingSection = document.getElementById("completing-section");
    const completedSection = document.getElementById("completed-section");

    const taskCard = document.createElement("div");
    taskCard.className = `task-card ${getTaskStatusClass(task.status)}`;
    
    const taskText = document.createElement("p");
    taskText.innerText = task.text;

    const startButton = createButton("Empezar", () => changeStatus(task.text, "Doing"));
    const completeButton = createButton("Completar", () => changeStatus(task.text, "Done"));
    const deleteButton = createButton("Eliminar", () => deleteTask(task.text));

    taskCard.appendChild(taskText);
    taskCard.appendChild(startButton);
    taskCard.appendChild(completeButton);
    taskCard.appendChild(deleteButton);

    if (task.status === "Doing") {
        completingSection.appendChild(taskCard);
    } else if (task.status === "Done") {
        completedSection.appendChild(taskCard);
    } else {
        tasksContainer.appendChild(taskCard);
    }
}

function createButton(label, onClick) {
    const button = document.createElement("button");
    button.innerText = label;
    button.addEventListener("click", onClick);
    return button;
}

function changeStatus(text, newStatus) {
    let tasks = loadTasks();
    const updatedTasks = tasks.map(task => {
        if (task.text === text) {
            task.status = newStatus;
        }
        return task;
    });

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    displayTasks();
}

function deleteTask(text) {
    let tasks = loadTasks();
    const updatedTasks = tasks.filter(task => task.text !== text);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    displayTasks();
}

function getTaskStatusClass(status) {
    switch (status) {
        case "To Do":
            return "";
        case "Doing":
            return "in-progress";
        case "Done":
            return "completed";
        default:
            return "";
    }
}
