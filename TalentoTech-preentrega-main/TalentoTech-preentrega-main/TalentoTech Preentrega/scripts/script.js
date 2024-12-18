document.addEventListener('DOMContentLoaded', function() {
    const apiURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='; // URL de la API para obtener más productos

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function obtenerProductos() {
        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                generarListadoProductos(data.meals); // Ajusta para manejar la estructura de la respuesta
            })
            .catch(error => console.error('Error al obtener los productos:', error));
    }

    function generarListadoProductos(productos) {
        const contenedorProductos = document.getElementById('productos');
        if (!contenedorProductos) {
            console.error('El contenedor de productos no se encontró.');
            return;
        }
        contenedorProductos.classList.add('productos-container'); // Agrega la clase al contenedor
        productos.forEach(producto => {
            const productoElemento = document.createElement('div');
            productoElemento.classList.add('producto');
            productoElemento.innerHTML = `
                <h3>${producto.strMeal}</h3>
                <img src="${producto.strMealThumb}" alt="${producto.strMeal}">
                <p class="precio">Precio: $${producto.idMeal}</p>
                <button onclick="añadirAlCarrito(${producto.idMeal})">Añadir al Carrito</button>
            `;
            contenedorProductos.appendChild(productoElemento);
        });
    }

    function añadirAlCarrito(id) {
        const producto = carrito.find(p => p.idMeal === id);
        if (producto) {
            producto.cantidad++;
        } else {
            fetch(`${apiURL}/${id}`)
                .then(response => response.json())
                .then(data => {
                    const nuevoProducto = data.meals[0];
                    carrito.push({ ...nuevoProducto, cantidad: 1 });
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    sessionStorage.setItem('carrito', JSON.stringify(carrito));
                    mostrarCarrito();
                })
                .catch(error => console.error('Error al añadir el producto al carrito:', error));
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        sessionStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }

    function mostrarCarrito() {
        const contenedorCarrito = document.getElementById('carrito');
        contenedorCarrito.innerHTML = '';
        carrito.forEach(producto => {
            const productoElemento = document.createElement('div');
            productoElemento.classList.add('producto-carrito');
            productoElemento.innerHTML = `
                <h3>${producto.strMeal}</h3>
                <img src="${producto.strMealThumb}" alt="${producto.strMeal}">
                <p class="precio">Precio: $${producto.idMeal}</p>
                <p>Cantidad: <input type="number" value="${producto.cantidad}" onchange="cambiarCantidad(${producto.idMeal}, this.value)"></p>
                <button onclick="eliminarDelCarrito(${producto.idMeal})">Eliminar</button>
            `;
            contenedorCarrito.appendChild(productoElemento);
        });
    }

    function cambiarCantidad(id, cantidad) {
        const productoEnCarrito = carrito.find(p => p.idMeal === id);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad = parseInt(cantidad);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            sessionStorage.setItem('carrito', JSON.stringify(carrito));
            mostrarCarrito();
        }
    }

    function eliminarDelCarrito(id) {
        carrito = carrito.filter(p => p.idMeal !== id);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        sessionStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }

    obtenerProductos();
    mostrarCarrito();
});


document.addEventListener('DOMContentLoaded', function() {
    const cantidadElement = document.getElementById('cantidad');
    const agregarButton = document.getElementById('agregar');
    const eliminarButton = document.getElementById('eliminar');

    let cantidad = parseInt(localStorage.getItem('cantidad')) || 0;
    cantidadElement.textContent = cantidad;

    agregarButton.addEventListener('click', function() {
        cantidad++;
        cantidadElement.textContent = cantidad;
        localStorage.setItem('cantidad', cantidad);
    });

    eliminarButton.addEventListener('click', function() {
        cantidad = 0;
        cantidadElement.textContent = cantidad;
        localStorage.setItem('cantidad', cantidad);
    });
});
