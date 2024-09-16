
document.addEventListener('DOMContentLoaded', function() {
  const conciertoInput = document.getElementById('concierto');
  const cantidadInput = document.getElementById('cantidad');   
  const comprarBtn = document.getElementById('comprarBtn');    
  const resultadoDiv = document.getElementById('resultado');    


  const precioEntradaBadOmens = 150;
  const precioEntradaSlipknot = 200;

 
  function calcularCostoTotal(precioEntrada, cantidad) {
      return precioEntrada * cantidad;
  }

 
  function procesarCompraConcierto(nombreConcierto, cantidadEntradas, precioEntrada) {
      const costoTotal = calcularCostoTotal(precioEntrada, cantidadEntradas);

    
      resultadoDiv.innerHTML = `
          <h3>Resumen de tu compra:</h3>
          <p>Concierto: ${nombreConcierto}</p>
          <p>Cantidad de entradas: ${cantidadEntradas}</p>
          <p>Costo total: $${costoTotal}</p>
      `;
  }

  
  comprarBtn.addEventListener('click', function() {
      const nombreConcierto = conciertoInput.value.toLowerCase(); 
      const cantidadEntradas = parseInt(cantidadInput.value);    

      if (isNaN(cantidadEntradas) || cantidadEntradas <= 0) {
          alert('Por favor, ingrese una cantidad válida.');
          return;
      }

      let precioEntrada;
      if (nombreConcierto === 'bad omens') {
          precioEntrada = precioEntradaBadOmens;
      } else if (nombreConcierto === 'slipknot') {
          precioEntrada = precioEntradaSlipknot;
      } else {
          alert('Concierto no válido. Por favor, seleccione "Bad Omens" o "Slipknot".');
          return;
      }

      procesarCompraConcierto(nombreConcierto, cantidadEntradas, precioEntrada);
  });
});
