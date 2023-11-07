// Crear clase que sirve de molde para cada tarea
class Task {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.completed = false;
    }
}

// Obtener elementos del formulario y la lista de tareas
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

// Obtener las tareas almacenadas en LocalStorage al cargar la página
const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Llenar la lista de tareas con las tareas almacenadas
storedTasks.forEach(taskData => {
    const task = new Task(taskData.title, taskData.description);
    task.completed = taskData.completed;
    addTaskToUI(task);
});

// Control del evento de envío de formulario
taskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener valores del título y la descripción
    const taskTitle = document.getElementById("task-title").value;
    const taskDescription = document.getElementById("task-description").value;

    // Verificar si el título está vacío y mostrar una alerta si es así
    if (taskTitle.trim() === "") {
        alert("El título de la tarea no puede estar vacío.");
        return;
    }

    // Crear un nuevo objeto de la clase Task con el título y descripción
    const newTask = new Task(taskTitle, taskDescription);

    // Llamar a la función addTask para agregar la tarea
    addTaskToUI(newTask);

    // Guardar las tareas actualizadas en LocalStorage
    storedTasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));

    // Limpiar el formulario
    taskForm.reset();
});

// Función para agregar una tarea a la interfaz de usuario
function addTaskToUI(task) {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <button class "complete-button">Completar</button>
        <button class="delete-button">Eliminar</button>
    `;

    taskList.appendChild(taskItem);

    // Agregar eventos para completar y eliminar tareas
    const completeButton = taskItem.querySelector(".complete-button");
    completeButton.addEventListener("click", function () {
        task.completed = true;
        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <div class="bg-green-300 text-green-800 p-2 rounded-lg">Completado</div>
        `;

        // Actualizar las tareas en LocalStorage después de completar
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
    });

    const deleteButton = taskItem.querySelector(".delete-button");
    deleteButton.addEventListener("click", function () {
        // Eliminar la tarea de la lista
        taskList.removeChild(taskItem);

        // Eliminar la tarea de LocalStorage
        storedTasks.splice(storedTasks.indexOf(task), 1);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
    });
}
