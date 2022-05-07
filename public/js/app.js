function cargarTabla() {
  fetch("/platos/")
  .then(
    function(response){
      return response.json();
    }
  )
  .then (
    function(json) {
      for(var cont = 0;json.length > cont; cont++) {
        var ingredientes = json[cont].ingredientes
        var descripcion = ""
        for(var i = 0; ingredientes.length > i; i++) {
          if(i == ingredientes.length-1) {
            descripcion += ingredientes[i].nombre+".";
          } else {
            descripcion += ingredientes[i].nombre+", ";
          }
        }
        var linea = "<div><h2>"+json[cont].nombre+"</h2><p>Ingredientes: "+descripcion+"</p><p>Precio: ₡"+json[cont].precio+"</p></div>";
        document.getElementById("tablaPlatos").insertAdjacentHTML("beforeend", linea);
      }
    }
  ) 
}

function validarNombre() {
  let x = document.forms["formulario"]["plato"].value;
  if (x == "") {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debe colocarle un nombre al plato.',
    });
    return false;
  }
}

function validarPrecio() {
  let y = document.forms["formulario"]["precio"].value;
  if (y <= 0) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El precio no puede ser menor o igual a cero.',
    });
    return false;
  }
}

function insertarPlato() {
  var datos = {
    nombre: document.getElementById("nombre").value,
    carrera: document.getElementById("ingredientes").value,
    edad: document.getElementById("precio").value
  }
  
  fetch("/platos/insertar", {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: {'Content-Type': 'application/json'}
  })
  .then(
    function(response){
      return response.json();
    }
  )
  .then(
    function(json){
      var linea = "<tr><td>"+json._id+"</td><td>"+json.nombre+"</td><td>"+json.ingredientes+"</td><td>"+json.precio+"</td></tr>";
      document.getElementById("tablaPlatos").insertAdjacentHTML("beforeend", linea);
    }
  )
}

const form = document.getElementById("formulario");
if(form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      document.getElementById("plato").style.borderColor = "black";
      document.getElementById("precio").style.borderColor = "black";

      let plato = document.getElementById("plato").value;
      if (plato == "") {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Debe colocarle un nombre al plato.',
        });
        document.getElementById("plato").style.borderColor = "red";
        brake;
      }

      let precio = document.getElementById("precio").value;
      if (precio <= 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El precio no puede ser menor o igual a cero.',
        });
        document.getElementById("precio").style.borderColor = "red";
        brake;
      }

      let checkboxes = document.querySelectorAll('input[name="nombre"]:checked');
      let values = [];
      checkboxes.forEach((checkbox) => {
          values.push({ "nombre": checkbox.value });
      });
      var body = {
        plato: plato,
        ingredientes: values,
        precio: precio
      }
      

      fetch("/platos/insertar", {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
      })
      .then(
        function(response) {
          if(response) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Se ha registrado exitosamente',
              showConfirmButton: false,
              timer: 1500
            }).then(function() {
              window.location = `listar.html`;
            });
          }
          else
            alert('Ocurrió un error.');
        }
      )
     
    });
}