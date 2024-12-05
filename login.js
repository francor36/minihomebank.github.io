import { Users } from "./usuario.js";
import { bank } from "./Cuentas.js";

const banco = new bank();

//este boton de aca me muestra el fomulario de registro
const btnRegister = document.getElementById("registrar");
btnRegister.addEventListener("click", btnRegistrando);

function btnRegistrando() {
    //funcion del boton la cual le quita lo oculto
    const form = document.querySelector(".registrarse")
    form.classList.remove("oculto");
    form.children[0].classList.remove("oculto");

    //ocultamos el formulario de incio
    const oc = document.querySelector(".formularios")
    oc.classList.add("oculto");
    oc.children[0].classList.add("oculto");
}


const btnRegistrar = document.getElementById("register");
btnRegistrar.addEventListener("click", regi);

function regi() {
    const usuario = document.getElementById("usuarios").value.trim(); // Obtener valor y eliminar espacios
    const contraseña = document.getElementById("contraseñas").value.trim(); // Obtener valor y eliminar espacios
    if (usuario === "" || contraseña === "") {
        alert("Por favor, complete todos los campos.");
        return; // Salir de la función si hay campos vacíos
    } else {
        const nuevoUsuario = new Users(usuario, contraseña)
        banco.agregarUsuarios(nuevoUsuario.getUsuario(), nuevoUsuario.getContraseña());

        alert("Usuario registrado con éxito");

        // Ocultar el formulario de registro
        const formRegistro = document.querySelector(".registrarse");
        formRegistro.classList.add("oculto");
        formRegistro.children[0].classList.add("oculto");
        // Aquí también debes asegurarte de que la función agregarUsuarios sea correcta

        // Mostrar el formulario de inicio (o el siguiente formulario)
        const formInicio = document.querySelector(".formularios");
        formInicio.classList.remove("oculto");
        formInicio.children[0].classList.remove("oculto");


    }
}

const iniciar = document.getElementById("iniciar");
iniciar.addEventListener("click", validar);


function validar() {
    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;

    const usuariosList = banco.getUsuarios(); // Usa la instancia de banco
    const encontrado = usuariosList.find(u => u.usuario === usuario && u.contraseña === contraseña);

    if (encontrado) {

        alert("Bienvenido")
        window.location.href = "./index.html";
    } else {
        alert("usuario o contraseña incorrectos")
    }

}