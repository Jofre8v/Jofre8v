    function obtenerPrecioEntrada() {
        let precioEntrada = parseFloat(prompt("Ingrese el precio de la entrada"));

    while(precioEntrada <= 0) 
       alert("PRECIO DE LA ENTRADA INVÁLIDO, VUELVA A INGRESAR OTRO");

    precioEntrada = parseFloat(prompt("Ingrese el precio de la entrada"));

    }

let nombreConcierto = prompt("Ingrese el nombre del concierto - ESCRIBA EXIT PARA SALIR DEL PROGRAMA");
let listaDeConciertos = "Metallica";
let totalEntradas = 5;
let costoTotal = 100;

while (nombreConcierto !== "EXIT") {

    }
    const precioEntrada = obtenerPrecioEntrada();

    let cantidadEntradas = parseInt(prompt("Ingrese la cantidad de entradas que desea comprar"));
    
    while (cantidadEntradas >= 0) {alert("CANTIDAD DE ENTRADAS INVÁLIDA, VUELVA A INGRESAR OTRA")};
    
    cantidadEntradas = parseInt(prompt("Ingrese la cantidad de entradas que desea comprar"));{
    }

    const costoConcierto = calcularCostoTotal(precioEntrada, cantidadEntradas);
    costoTotal += costoConcierto;
    totalEntradas += cantidadEntradas;

    if (listaDeConciertos !== '') {listaDeConciertos += " - "}; {
    }

    listaDeConciertos += nombreConcierto;

    nombreConcierto = prompt("Ingrese el nombre del concierto - ESCRIBA EXIT PARA SALIR DEL PROGRAMA");{
    }

    console.log("Total de entradas compradas: " + totalEntradas);
    console.log("Costo total de entradas: $" + costoTotal);
    console.log("Lista de conciertos: " + listaDeConciertos);


