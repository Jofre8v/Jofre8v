let nombreConcierto = prompt("Ingrese el nombre del concierto - ESCRIBA EXIT PARA SALIR DEL PROGRAMA");
let listaDeConciertos = "";
let totalEntradas = 0;
let costoTotal = 0;

// Función para obtener y validar el precio de una entrada
function obtenerPrecioEntrada() {
    let precioEntrada = parseFloat(prompt("Ingrese el precio de la entrada"));

    // Mientras el precio de la entrada sea menor o igual a cero
    while (precioEntrada <= 0) {
        alert("PRECIO DE LA ENTRADA INVÁLIDO, VUELVA A INGRESAR OTRO");
        precioEntrada = parseFloat(prompt("Ingrese el precio de la entrada"));
    }

    return precioEntrada;
}

// Función para calcular el costo total basado en la cantidad de entradas
function calcularCostoTotal(precio, cantidad) {
    return precio * cantidad;
}

// Ciclo para procesar las entradas mientras el usuario no escriba "EXIT"

while (nombreConcierto.toUpperCase() !== "EXIT") {

    // Pedimos y validamos precio de la entrada
    const precioEntrada = obtenerPrecioEntrada();

    // Pedimos la cantidad de entradas
    let cantidadEntradas = parseInt(prompt("Ingrese la cantidad de entradas que desea comprar"));

    // Validamos la cantidad de entradas (debe ser mayor a cero)
    while (cantidadEntradas <= 0 || isNaN(cantidadEntradas)) {
        alert("CANTIDAD DE ENTRADAS INVÁLIDA, VUELVA A INGRESAR OTRA");
        cantidadEntradas = parseInt(prompt("Ingrese la cantidad de entradas que desea comprar"));
    }

    // Calcular el costo total para el concierto actual
    const costoConcierto = calcularCostoTotal(precioEntrada, cantidadEntradas);
    costoTotal += costoConcierto;
    totalEntradas += cantidadEntradas;

    // Agregar concierto a la lista
    if (listaDeConciertos !== '') {
        listaDeConciertos += " - ";
    }
    listaDeConciertos += nombreConcierto;

    // Volvemos a pedir nombre del concierto
    nombreConcierto = prompt("Ingrese el nombre del concierto - ESCRIBA EXIT PARA SALIR DEL PROGRAMA");
}

// Mostrar resultados
console.log("Total de entradas compradas: " + totalEntradas);
console.log("Costo total de entradas: $" + costoTotal.toFixed(2));
console.log("Lista de conciertos: " + listaDeConciertos);







