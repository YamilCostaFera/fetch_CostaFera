const botonCarrito = document.querySelectorAll('.botonCarrito');
const itinerarCarrito = document.querySelector('.itinerarCarrito');
const tbody = document.querySelector('.tbody');
// BUSCADOR
const contenedor = document.querySelector('#contenedor');
const selectTorta = document.querySelector('#tortasSrch');
const btnBuscar = document.querySelector('#buscar');


// const botonFinalizar = document.querySelector('.finalizarCompra');
let compra = [];

botonCarrito.forEach(btn => {
    btn.addEventListener('click', sumarProducto);
    btn.addEventListener('click', ()=>{
        Toastify({

            text: `Agregaste al carrito`,

            duration: 3000,

            offset: {x:10, y:100}
            
            }).showToast();
    } 
    );
   
})

//boton finalizar compra ||FALTA TERMINARLO
// botonFinalizar (btn =>{
//     btn.addEventListener('click',()=>{

//     })
// })
function sumarProducto(e) {
    // Con esto tomamos los elementos de los productos
    const button = e.target;
    const seleccion = button.closest('.card');
    const seleccionTorta = seleccion.querySelector('.card-title').textContent;
    const seleccionPrecio = seleccion.querySelector('.precio').textContent;
    const seleccionImg = seleccion.querySelector('.card-img-top').src;

    // con esta variable se crea un item nuevo tomando la funcion anterior
    const newItem = {
        title: seleccionTorta,
        precio: seleccionPrecio,
        img: seleccionImg,
        cantidad: 1,
    }
    addItemCompra(newItem);
}
// con esta funcion agragamos el nuevo item al carrito ||push
function addItemCompra(newItem) {

    const inputCantidad = tbody.getElementsByClassName('sumarCantidad');
    //para recorrer el carrito y que sume los productos iguales || .trim sirve para eliminar espacios a los lados, para garantzar que esten iguales
    for (let i = 0; i < compra.length; i++) {
        if (compra[i].title.trim() === newItem.title.trim()) {
            compra[i].cantidad++; //cuando la condicion se cumpla, el valor cantidad aumenta
            const inputSumar = inputCantidad[i];
            inputSumar.value++; //sumamos una unidad de valor a la cantidad 
            CarritoTotal(); //ejecutamos la funcion para ir sumando los productos/items
            console.log(compra); //visualizamos en la consola la compra
            return null; //use el null para que no ejecute lo que sigue de la funcion, sino que retorne directamente arriba
        }


    }

    compra.push(newItem);
    renderCArrito();

}

//funcion para renderizar, incorporar los productos al carrito y que se visibilice en el html
function renderCArrito() {
    tbody.innerHTML = '';
    console.log(compra);
    compra.map(item => {
        const tr = document.createElement('tr');
        tr.classList.add('itemCarrito'); //se agrega una clase para ser creada con el tr
        const Content = `
        <th scope="row">1</th>
             <td class="fila_productos">
                 <img src=${item.img} alt="">
                 <h5 class="name ps-4 mt-2">${item.title} </h5>
             </td>
             <td class="fila_precio">
                 <p>${item.precio}</p>
             </td>
             <td class="fila_cantidad">
                 <input class="sumarCantidad" type="number" min="1" value=${item.cantidad}>
                 <button class="delete btn btn-warning">X</button>
             </td>
        `
        tr.innerHTML = Content;
        tbody.append(tr);

        tr.querySelector('.delete').addEventListener('click', removerItemCArrito);

    })
    CarritoTotal(); //ejecutamos la funcion para ir sumando los productos/items cada vez que renderice en el HTML los valores
    BtnDelete;
}


//para sumar los precios
function CarritoTotal() {
    let total = 0;
    const itemCompraTotal = document.querySelector('.totalCarrito');
    compra.forEach(item => {
        const precio = Number(item.precio.replace("$", ''));
        total = total + precio * item.cantidad; // calculo del precio por la cantidad.
    })
    //con este innerHTML imprimimos el nuevo total.
    itemCompraTotal.innerHTML = `Total de tu compra: $ ${total}`;
    addLocalStorage();
}


//funcion para remover productos del carrito
function removerItemCArrito(e) {
    const buttonDelete = e.target;
    const tr = buttonDelete.closest('.itemCarrito'); //componente PADRE del boton
    const title = tr.querySelector('.name').textContent;

    for (let i = 0; i < compra.length; i++) {
        if (compra[i].title.trim() === title.trim()) {
            compra.splice(i, 1); // le damos la posicion donde nos encontramos [i] al elemento a eliminar y la cantidad (1).
        }
    }
    tr.remove();
    CarritoTotal(); //se vuelve a ejecutar para que modifique el total de la suma
}




//LOCALSTORAGE || para refrescar la pagina y que no se borre el carritoectTorta

function addLocalStorage() {
    localStorage.setItem('compra', JSON.stringify(compra));
}



window.onload = function () {
    const storage = JSON.parse(localStorage.getItem('compra'));
    if (storage) {
        compra = storage;
        renderCArrito();
    }
}

// BUSCADOR



function cakeFilter(array) {
    let nombre = selectTorta.value;
    if (!nombre) {
        return array;
    } else {
        result = array.filter((e) => e.nombre == nombre);
        return result;
    }
}

function createHTML(array) {
    contenedor.innerHTML = '';
    container.innerHTML = '';
    array.forEach((torta) => {
        const card = `
            <div class="col">
                <div class="card h-100">
                    <img src="${torta.imagen}" class="card-img-top" alt="${torta.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${torta.nombre}</h5>
                        <p class="card-text">Ingredientes: ${torta.ingredientes}</p>
                        <p class="card-text">Porciones: ${torta.porciones}</p>
                        <p class="card-text">Peso Aprox: ${torta.peso}</p>
                        <p class="card-text">PRECIO: ${torta.precio}</p>
                    </div>
                </div>
            </div>`
        container.innerHTML += card
    })
}

async function traerDatos() {
    const respuesta = await fetch('./js/data.json');
    const data = await respuesta.json();
    createHTML(cakeFilter(data));
}

btnBuscar.addEventListener('click', () => {
    traerDatos();
})


// bajqr de la API
const listUsers = async() =>{
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    let tableBody = ``;
    users.forEach((users, index) =>{
        tableBody +=`<tr>
        <td>${users.id}</td>
        <td>${users.name}</td>
        <td>${users.phone}</td>
        <td>${users.email}</td>
        </tr>`;
    });
    document.getElementById("tableBody_Users").innerHTML = tableBody;

};

window.addEventListener("load", function(){
    listUsers();
})