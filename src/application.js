"use strict";
//=========================================================================
if (localStorage.length > 0) {
  document.getElementById("lista-tareas").innerHTML = "";
  for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i);
    document.getElementById("lista-tareas").innerHTML +=
      localStorage.getItem(clave);
  }
} else {
  document.getElementById("lista-tareas").innerText =
    "¡No hay ninguna tarea guardada en iAnotación!";
  document.getElementById("lista-tareas").style.padding = "12px";
}
//=========================================================================
let fechaFormateada = new Intl.DateTimeFormat("es-ES", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
}).format(new Date());

document.getElementById("fecha").innerText = fechaFormateada =
  fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
//=========================================================================
document.getElementById("anadir-tarea-btn").addEventListener("click", () => {
  if (document.getElementById("tarea").value !== "") {
    const tareaID = crypto.randomUUID();
    let plantilla = `<li class="la-tarea" id="tarea-${tareaID}">${
      document.getElementById("tarea").value
    }</li>`;
    localStorage.setItem(`tarea-${tareaID}`, plantilla);
    window.location.reload();
  }
});
//=========================================================================
document.getElementById("borrar-todo").addEventListener("click", () => {
  document.getElementById("lista-tareas").innerHTML = "";
  localStorage.clear();
  document.getElementById("lista-tareas").innerText =
    "¡No hay ninguna tarea guardada en iAnotación!";
  document.getElementById("lista-tareas").style.padding = "12px";
});
//=========================================================================
if (document.querySelector(".la-tarea")) {
  document.querySelectorAll(".la-tarea").forEach((tarea) => {
    tarea.addEventListener("click", function () {
      document
        .getElementById("lista-tareas")
        .removeChild(document.querySelector(".la-tarea"));
      localStorage.removeItem(`${this.id}`);
      window.location.reload();
    });
  });
}
//=========================================================================
document.querySelectorAll(".la-tarea").forEach((tarea) => {
  let timeoutId;

  tarea.addEventListener("mouseover", function () {
    timeoutId = setTimeout(function () {
      const nuevaTarea = prompt("Edite o valor da tarefa:", tarea.textContent);
      if (nuevaTarea && nuevaTarea.trim() !== "") {
        localStorage.setItem(
          tarea.id,
          `<li class="la-tarea" id="${tarea.id}">${nuevaTarea}</li>`
        );
        tarea.textContent = nuevaTarea;
      }
    }, 1500);
  });

  tarea.addEventListener("mouseout", () => clearTimeout(timeoutId));
  tarea.addEventListener("click", function () {
    localStorage.removeItem(tarea.id);
    tarea.remove();
  });
});
//=========================================================================
