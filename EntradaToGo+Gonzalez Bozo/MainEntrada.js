const database = [];

async function llamarDatabase() {
    try {
        const response = await fetch('conciertos.json');
        const result = await response.json();

        database.push(...result);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    await llamarDatabase()

    const conciertoInput = document.getElementById('concierto');
    const cantidadInput = document.getElementById('cantidad');   
    const comprarBtn = document.getElementById('comprarBtn');    
    const resultadoDiv = document.getElementById('resultado');
    const resultadoDivCompraPrevia = document.getElementById('compraPrevia');
    const form = document.querySelector('.conciertos__form')
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!conciertoInput.value || !cantidadInput.value) {
            return
        }

        Swal.fire({
            icon: 'success',
            title: 'Tickets adquiridos!',
            text: 'En unos minutos lo recibiras en tu correo...',
        });
    })

    const arrayDeNombresDeConciertos = database.map(concierto => {
        return concierto?.nombre
    });

    agregarConciertosAlSelect(conciertoInput, arrayDeNombresDeConciertos);

    cargarDatosPrevios();

    function agregarConciertosAlSelect(elemento, arrayDeConciertos) {
        let html = '';
        arrayDeConciertos.forEach(concierto => {
            html += `<option value="${concierto?.toLowerCase()}">${concierto}</option>`;
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
            <h2>Resumen de tu compra</h2>
            <p><strong>Concierto:</strong> ${nombreConcierto}</p>
            <p><strong>Cantidad de entradas:</strong> ${cantidadEntradas}</p>
            <p><strong>Costo total:</strong> $${costoTotal}</p>
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
            let html = '<h2>Compra previa guardada</h2>';
            datosCompra.forEach(datos => {
                html += `
                    <div class="compra-guardada">
                        <p><strong>Concierto:</strong> ${datos.nombreConcierto}</p>
                        <p><strong>Cantidad de entradas:</strong> ${datos.cantidadEntradas}</p>
                        <p><strong>Costo total:</strong> $${datos.costoTotal}</p>
                    </div>
                `;
            });

            resultadoDivCompraPrevia.innerHTML = html;
        }
    }
});

