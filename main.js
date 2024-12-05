import { Users } from "./usuario.js";
import { bank } from "./Cuentas.js";

const usuarios = new bank();
const btnIngreso = document.getElementById("Ingreso");
btnIngreso.addEventListener("click", ingreso);

function ingreso() {
    //seleccion de div que contiene el fomulario
    const form = document.querySelector(".Datos")
    form.classList.remove("oculto");
    form.children[0].classList.remove("oculto");

}
const btnGuardar = document.getElementById("Guardar");
btnGuardar.addEventListener("click", datitos);

function datitos() {
    const nombre = document.getElementById("Nombre").value;
    const apellido = document.getElementById("Apellido").value;
    const saldo = document.getElementById("Saldo").value;
    if (nombre === "" || apellido === "" || saldo === "") {
        alert("Por favor, complete todos los campos.");
        return; // Salir de la función si hay campos vacíos
    }
    const saldoNumero = parseFloat(saldo);
    if (isNaN(saldoNumero) || saldoNumero < 0) {
        alert("Por favor, ingrese un saldo válido (número positivo).");
        return; // Salir de la función si el saldo no es válido
    }

    const nuevoUsuario = new Users();
    usuarios.agregarDatos(nombre, apellido, saldo);
    console.log(usuarios.datos);

    // Obtener la referencia a la tabla
    const tabla = document.getElementById("tablaDatos").getElementsByTagName('tbody')[0];

    // Crear una nueva fila
    const nuevaFila = tabla.insertRow();

    // Insertar celdas en la nueva fila
    const celdaNombre = nuevaFila.insertCell(0);
    const celdaApellido = nuevaFila.insertCell(1);
    const celdaSaldo = nuevaFila.insertCell(2);
    const celdaid = nuevaFila.insertCell(3);
    // Asignar los valores a las celdas
    celdaNombre.textContent = nombre;
    celdaApellido.textContent = apellido;
    celdaSaldo.textContent = saldo;
    celdaid.textContent = nuevoUsuario.idCuenta;

    // Limpiar los campos después de agregar
    document.getElementById("Nombre").value = "";
    document.getElementById("Apellido").value = "";
    document.getElementById("Saldo").value = "";

    alert("se cargo con exito")
    const form = document.querySelector(".Datos")
    form.classList.add("oculto");
    form.children[0].classList.add("oculto");
}

const btnCerrar = document.getElementById("Salir");
btnCerrar.addEventListener("click", cerrar)

function cerrar() {
    window.location.href = "./home.html";

}

const bntTransferir = document.getElementById("Transferir")
bntTransferir.addEventListener("click", transferir);

function transferir() {
    const cuenta = usuarios.getDatos();
    const selectOrigen = document.getElementById("cuentaOrigen");
    const selectDestino = document.getElementById("cuentaDestino");
    // Limpiar los selects
    selectOrigen.innerHTML = '';
    selectDestino.innerHTML = '';

    //lenamos los set origen
    cuenta.forEach((dato, index) => {
        const option = document.createElement("option");
        option.value = index; // Usar el índice como valor de la opción
        option.textContent = `${dato.nombre} ${dato.apellido} - Saldo: $${dato.saldo}`; // Texto visible
        selectOrigen.appendChild(option);
    });

    // Llenar select de cuenta destino
    cuenta.forEach((dato, index) => {
        const option = document.createElement("option");
        option.value = index; // Usar el índice como valor de la opción
        option.textContent = `${dato.nombre} ${dato.apellido} - Saldo: $${dato.saldo}`; // Texto visible
        selectDestino.appendChild(option);
    });

    const form = document.querySelector(".transferir")
    form.classList.remove("oculto");
    form.children[0].classList.remove("oculto");
}
const btnRealizarTransferencia = document.getElementById("realizarTransferencia");
btnRealizarTransferencia.addEventListener("click", realizarTransferencia);

function realizarTransferencia() {
    const selectOrigen = document.getElementById("cuentaOrigen");
    const selectDestino = document.getElementById("cuentaDestino");
    const monto = parseFloat(document.getElementById("montoTransferir").value);

    const cuentaOrigenIndex = selectOrigen.value;
    const cuentaDestinoIndex = selectDestino.value;

    if (cuentaOrigenIndex === cuentaDestinoIndex) {
        alert("No puedes transferir a la misma cuenta.");
        return; // Salir de la función si las cuentas son iguales
    }

    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingrese un monto válido para transferir.");
        return;
    }

    const cuentaOrigen = usuarios.datos[cuentaOrigenIndex];
    const cuentaDestino = usuarios.datos[cuentaDestinoIndex];

    if (cuentaOrigen.saldo < monto) {
        alert("Saldo insuficiente en la cuenta de origen.");
        return;
    }

    // Restar el monto de la cuenta de origen
    cuentaOrigen.saldo = parseFloat(cuentaOrigen.saldo) - monto; // Asegúrate de que el saldo sea un número

    // Sumar el monto a la cuenta de destino
    cuentaDestino.saldo = parseFloat(cuentaDestino.saldo) + monto; // Asegúrate de que el saldo sea un número

    alert(`Transferencia de $${monto} realizada con éxito de ${cuentaOrigen.nombre} ${cuentaOrigen.apellido} a ${cuentaDestino.nombre} ${cuentaDestino.apellido}.`);

    // Actualizar la tabla o el estado visual si es necesario
    actualizarTabla();

    // Limpiar el campo de monto
    document.getElementById("montoTransferir").value = "";
    const form = document.querySelector(".transferir")
    form.classList.add("oculto");
    form.children[0].classList.add("oculto");
}

function actualizarTabla() {
    const tabla = document.getElementById("tablaDatos").getElementsByTagName('tbody')[0];
    // Limpiar la tabla antes de actualizar
    tabla.innerHTML = '';

    // Volver a agregar los datos actualizados
    usuarios.datos.forEach(usuario => {
        const nuevaFila = tabla.insertRow();
        const celdaNombre = nuevaFila.insertCell(0);
        const celdaApellido = nuevaFila.insertCell(1);
        const celdaSaldo = nuevaFila.insertCell(2);
        const celdaid = nuevaFila.insertCell(3);

        celdaNombre.textContent = usuario.nombre; // Acceder directamente al nombre
        celdaApellido.textContent = usuario.apellido; // Acceder directamente al apellido
        celdaSaldo.textContent = usuario.saldo; // Acceder directamente al saldo
        celdaid.textContent = usuario.idCuenta; // Acceder directamente al ID
    
    });
}

