<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Iconos-->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous">
    <!--Bootstrap-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
    <!--Toastify-->
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
    <!--CSS-->
    <link rel="stylesheet" href="estilos.css">

    
    <title>Mis libros</title>
</head>
<body class="">

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Mis Libros</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon "></span>
          </button>
      
          <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav me-auto">
              <form class="d-flex">
                <input id="buscador"class="form-control me-2" placeholder="Busqueda por titulo/autor" aria-label="Search">
                <button id="btnBuscar" class="btn btn-outline-success">Buscar</button>
              </form> 
              
            </ul>
            <ul>
              <select id="selectOrden" class="form-select form-select-sm" aria-label=".form-select-sm example">
                <option selected>Ordenar por:</option>
                <option value="1">Mayor a menor</option>
                <option value="2">Menor a mayor</option>
                <option value="3">Alfabeticamente</option>
              </select>
            </ul>
            <ul style="list-style: none;"className="navbar-nav me-auto">  
              <li className="nav-item " >
                  <a id="botonCarrito" data-bs-toggle="modal" data-bs-target="#idModalCarrito" class="btn btn-secondary"><i class="fas fa-shopping-cart fa-1x"></i></a>
              </li>
          </ul>
           
          </div>
          <div>
              
          </div>
        </div> 
      </nav>

    
    <div class="container m-4">
        <div class="row">
          <div class="col-3">
            <div id="fecha"></div>
          </div> 
          <div class="col-3">
            <button id="toggleMode" class="btn btn-dark">Dark</button>
          </div>  
          <div class="col-3">
              <button id="agregarLibro" data-bs-toggle="modal" data-bs-target="#idModalAgregarLibro" class="btn btn-success">Agregar libro</button>
          </div>
        </div>
  
    </div>


        <!-- <div class="container">
            <div class="row">
                <div class="col-3">
                    <button id="verCatalogo" class="btn btn-success">Ver Catálogo</button>
                </div>
                <div class="col-3">
                    <button id="ocultarCatalogo" class="btn btn-success">Ocultar Catálogo</button>
                </div>

            </div>
    </div>       -->
    
    
    <div class="container">
        <div id="coincidencia"></div>
        <div id="libros" class="row"></div>
    </div>    
    
    

    <!--Modals-->
    <!--Modal Agregar Libro-->
    <div class="modal fade" id="idModalAgregarLibro" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Agregar Libro</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="modal-body">
              <form id="formAgregarLibro">
                <div class="mb-3">
                  <label for="titulo" class="form-label">Titulo</label>
                  <input type="text" class="form-control" id="tituloInput" aria-describedby="titulo">
                  
                </div>
                <div class="mb-3">
                  <label for="autor" class="form-label">Autor</label>
                  <input type="text" class="form-control" id="autorInput" aria-describedby="autor">
                  
                </div>
                <div class="mb-3">
                  <label for="precio" class="form-label">Precio:</label>
                  <input type="text" class="form-control" id="precioInput" aria-describedby="precio">
                  
                </div>
              </form>
            </div>
            
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="text" id="guardarLibroBtn" class="btn btn-success" data-bs-dismiss="modal">Guardar Libro</button>
            </div>
          </div>
        </div>
      </div>
  
      <!--Modal Carrito-->
      <div class="modal fade" id="idModalCarrito" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Carrito de Compras</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="modal-bodyCarrito">
              
            </div>
            <div class="row ml-ato">
              <p id="precioTotal"></p>
            </div>
            <div class="modal-footer">
              
              
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" data-bs-dismiss="modal" class="btn btn-success" id="botonFinalizarCompra">Finalizar Compra</button>
            </div>
          </div>
        </div>
      </div>
<!--Script de Bootstrap-->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous">
</script>
<!--Script de Sweet alert-->
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<!--Toastify-->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
<!--Luxon-->
<script src="https://cdn.jsdelivr.net/npm/luxon@2.3.0/build/global/luxon.min.js"></script>
<!--Archivos JS propios-->
<!--importante el orden-->
<script src="JS/class.js"></script>
<script src="JS/main.js"></script>
<script src="JS/darkToggle.js"></script>
</body>
</html>