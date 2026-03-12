const tareaForm = document.getElementById("tarea-form");
const tareaInput = document.getElementById("tarea");
const descripcionInput = document.getElementById("descripcion");
const tareaListado = document.getElementById("tareas-listado");

// Función para guardar tarea en localstorage
function guardarTarea(tarea, descripcion) {
  const tareaObj = {
    tarea: tarea,
    descripcion: descripcion,
  };
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas.push(tareaObj);
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Función para cargar tareas desde localstorage
function cargarTareas() {
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas.forEach((tarea) => {
    const lista = document.createElement("li");
    lista.textContent = `${tarea.tarea} - ${tarea.descripcion}`;
    lista.addEventListener("click", () => {
      // Eliminar tarea
      const index = tareas.indexOf(tarea);
      tareas.splice(index, 1);
      localStorage.setItem("tareas", JSON.stringify(tareas));
      lista.remove();
    });
    tareaListado.appendChild(lista);
  });
}

// Evento de submit
tareaForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const tarea = tareaInput.value;
  const descripcion = descripcionInput.value;
  guardarTarea(tarea, descripcion);
  tareaForm.reset();
  cargarTareas();
});

// Cargar tareas desde localstorage al cargar la página
cargarTareas();
