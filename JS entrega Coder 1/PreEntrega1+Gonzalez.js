function calcularCostoTotal(precioEntrada, cantidadEntradas) {
    let costoTotal = precioEntrada * cantidadEntradas;
    return costoTotal;
  }
  
  const nombreConcierto = prompt(
    'Ingrese el nombre del concierto - ESCRIBA EXIT PARA SALIR DEL PROGRAMA'
  );
  const listaDeConciertos = '';
  const precioEntrada = 100;
  
  if (
      nombreConcierto?.toLowerCase() !== 'exit'
     ) {

    const cantidadEntradas = parseInt(
      prompt('Ingrese la cantidad de entradas que desea comprar')
    );
  
    const costoConcierto = calcularCostoTotal(precioEntrada, cantidadEntradas);
  
    for (let index = 0; index < cantidadEntradas; index++) {
      console.log('Entrada número ' + (index + 1));
      console.log('Total de entradas compradas: ' + cantidadEntradas);
      console.log('Costo total de entradas: $' + costoConcierto);
      console.log('Costo unitario de entrada: $' + precioEntrada);
      console.log('Lista de conciertos: ' + nombreConcierto);
      console.log('------------------------------------');
    }
  }






