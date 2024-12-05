export class bank {
    constructor() {
        this.usuarios = [];
        this.datos = [];
    }
    agregarUsuarios(usuario, contraseña) {
        const nuevoUsuario = { usuario, contraseña };
        this.usuarios.push(nuevoUsuario);
    }
    getUsuarios() {
        return this.usuarios; // Método para obtener el arreglo de usuarios
    }
    agregarDatos( nombre, apellido, saldo) {
        const nuevoDato = {nombre, apellido, saldo };
        this.datos.push(nuevoDato);
    }
    getDatos() {
        return this.datos; // Método para obtener el arreglo de datos
    }


}