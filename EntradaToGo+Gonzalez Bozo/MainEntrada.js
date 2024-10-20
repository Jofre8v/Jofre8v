document.addEventListener('DOMContentLoaded', function() {
    const conciertoInput = document.getElementById('concierto');
    const cantidadInput = document.getElementById('cantidad');   
    const comprarBtn = document.getElementById('comprarBtn');    
    const resultadoDiv = document.getElementById('resultado');
    const resultadoDivCompraPrevia = document.getElementById('compraPrevia');

    const database =  [
    {"nombre": "Slipknot", "precio": 500 },
    { "nombre": "Metallica", "precio": 600 },
    { "nombre": "Nirvana", "precio": 550 },
    { "nombre": "Slipknot", "precio": 500 },
    { "nombre": "Metallica", "precio": 600 },
    { "nombre": "Nirvana", "precio": 550 },
    { "nombre": "AC/DC", "precio": 700 },
    { "nombre": "Led Zeppelin", "precio": 650 },
    { "nombre": "Pink Floyd", "precio": 680 },
    { "nombre": "Queen", "precio": 750 },
    { "nombre": "The Beatles", "precio": 800 },
    { "nombre": "The Rolling Stones", "precio": 720 },
    { "nombre": "Guns N' Roses", "precio": 670 },
    { "nombre": "Linkin Park", "precio": 600 },
    { "nombre": "Green Day", "precio": 590 },
    { "nombre": "The Who", "precio": 710 },
    { "nombre": "Aerosmith", "precio": 640 },
    { "nombre": "Red Hot Chili Peppers", "precio": 630 },
    { "nombre": "Foo Fighters", "precio": 620 },
    { "nombre": "Rammstein", "precio": 680 },
    { "nombre": "The Doors", "precio": 690 },
    { "nombre": "KISS", "precio": 610 },
    { "nombre": "Pearl Jam", "precio": 650 },
    { "nombre": "The Smashing Pumpkins", "precio": 620 },
    { "nombre": "Deep Purple", "precio": 670 },
    { "nombre": "Black Sabbath", "precio": 750 },
    { "nombre": "Iron Maiden", "precio": 700 },
    { "nombre": "System of a Down", "precio": 580 },
    { "nombre": "Soundgarden", "precio": 590 },
    { "nombre": "Pantera", "precio": 640 },
    { "nombre": "Megadeth", "precio": 680 },
    { "nombre": "Judas Priest", "precio": 710 },
    { "nombre": "Rage Against the Machine", "precio": 650 },
    { "nombre": "Avenged Sevenfold", "precio": 630 },
    { "nombre": "Muse", "precio": 620 },
    { "nombre": "Radiohead", "precio": 690 },
    { "nombre": "The Strokes", "precio": 600 },
    { "nombre": "The Killers", "precio": 620 },
    { "nombre": "Arctic Monkeys", "precio": 610 },
    { "nombre": "Motörhead", "precio": 700 },
    { "nombre": "Disturbed", "precio": 650 },
    { "nombre": "Evanescence", "precio": 620 },
    { "nombre": "Marilyn Manson", "precio": 630 },
    { "nombre": "The Cure", "precio": 680 },
    { "nombre": "Fall Out Boy","precio": 610 },
    { "nombre": "Bring Me the Horizon","precio": 590 },
    { "nombre": "Blink-182", "precio": 600 },
    { "nombre": "Paramore", "precio": 580 },
    { "nombre": "Thirty Seconds to Mars", "precio": 620 },
    { "nombre": "Breaking Benjamin", "precio": 590 },
    { "nombre": "My Chemical Romance", "precio": 650 },
    { "nombre": "Limp Bizkit", "precio": 600 },
    { "nombre": "Bad Omens","precio": 800 }
    ];

    const arrayDeNombresDeConciertos = database.map(concierto => concierto.nombre);
    agregarConciertosAlSelect(conciertoInput, arrayDeNombresDeConciertos);

    cargarDatosPrevios();

    function agregarConciertosAlSelect(elemento, arrayDeConciertos) {
        let html = '';
        arrayDeConciertos.forEach(concierto => {
            html += `<option value="${concierto.toLowerCase()}">${concierto}</option>`;
        });
        elemento.innerHTML = html;
    }

    function calcularCostoTotal(precioEntrada, cantidad) {
        return precioEntrada * cantidad;
    }

    function procesarCompraConcierto(nombreConcierto, cantidadEntradas, precioEntrada) {
        const costoTotal = calcularCostoTotal(precioEntrada, cantidadEntradas);
        const ticketsCompradosStringify = localStorage.getItem('ticketsComprados');
        const ticketsComprados = ticketsCompradosStringify || '[]';
        const ticketsCompradosParse = JSON.parse(ticketsComprados);

        const arrayConNuevoTicket = [
            ...ticketsCompradosParse,
            {
                nombreConcierto: nombreConcierto,
                cantidadEntradas: cantidadEntradas,
                costoTotal: costoTotal
            }
        ];

        localStorage.setItem('ticketsComprados', JSON.stringify(arrayConNuevoTicket));

        resultadoDiv.innerHTML = `
            <h2>Resumen de tu compra:</h2>
            <p>Concierto: ${nombreConcierto}</p>
            <p>Cantidad de entradas: ${cantidadEntradas}</p>
            <p>Costo total: $${costoTotal}</p>
        `;

        cantidadInput.value = 1;
        conciertoInput[0].selected = true;
    }

    comprarBtn.addEventListener('click', function() {
        const nombreConcierto = conciertoInput.value.toLowerCase(); 
        const cantidadEntradas = parseInt(cantidadInput.value);    

        if (isNaN(cantidadEntradas) || cantidadEntradas <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, ingrese una cantidad válida.',
            });
            return;
        }

        const conciertoSeleccionado = database.find(concierto => concierto.nombre.toLowerCase() === nombreConcierto);

        if (!conciertoSeleccionado) {
            Swal.fire({
                icon: 'error',
                title: 'Concierto no encontrado',
                text: 'El concierto seleccionado no existe en la base de datos.',
            });
            return;
        }

        procesarCompraConcierto(conciertoSeleccionado.nombre, cantidadEntradas, conciertoSeleccionado.precio);
    });

    function cargarDatosPrevios() {
        const compraGuardada = localStorage.getItem('ticketsComprados');

        if (compraGuardada) {
            const datosCompra = JSON.parse(compraGuardada);
            let html = '<h2>Compra previa guardada:</h2>';
            datosCompra.forEach(datos => {
                html += `
                    <div>
                        <p>Concierto: ${datos.nombreConcierto}</p>
                        <p>Cantidad de entradas: ${datos.cantidadEntradas}</p>
                        <p>Costo total: $${datos.costoTotal}</p>
                    </div>
                    <hr/>
                `;
            });

            resultadoDivCompraPrevia.innerHTML = html;
        }
    }
});
