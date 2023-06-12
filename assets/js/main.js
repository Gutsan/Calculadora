let valorPantalla = document.querySelector("#pantalla")
let valorPila = null
let operador = ""
let modoEscritura = true //Modo en el que se encuentra pantalla (true:Escritura False:ModoResultado)
let pantallaAuxiliar=document.querySelector("#pantallaAuxiliar")

// Evento cuando se presiona una de las teclas de operadores o numericas
function keyEvent(event) {
    var key = event.keyCode
    switch (key) {
        case 111:
            guardarOperadores("/")
            break
        case 106:
            guardarOperadores("*")
            break
        case 109:
            guardarOperadores("-")
            break
        case 107:
            guardarOperadores("+")
            break
        case 13:
            clickIgual()
            break
        default:
            if (key>96 && key<106){
                let numero=key-96
                agregarPantalla(numero)
            }
    }
}

//Agregar numeros ingresados a la pantalla de la calculadora
function agregarPantalla(valor) {

    if (modoEscritura) {
        valorPantalla.innerHTML = 0
        modoEscritura = false
        pantallaAuxiliar.innerHTML=""
    }
    pantallaActual = valorPantalla.innerHTML
    if (pantallaActual.length >= 9) {
        valorPantalla.innerHTML = valorPantalla.innerHTML
    }
    else if (parseInt(valorPantalla.innerHTML) === 0) {
        valorPantalla.innerHTML = valor
    }
    else {
        valorPantalla.innerHTML = valorPantalla.innerHTML + valor
    }
}

//tecla c limpiar pantalla
function limpiarPantalla() {
    valorPantalla.innerHTML = 0
}

//Función de tecla AC
function limpiarTodo() {
    valorPantalla.innerHTML = 0
    valorPila = null
    pantallaAuxiliar.innerHTML=""
}

//Función de los operadores
function guardarOperadores(valor) {
    agregarPila(valorPantalla.innerHTML)
    valorPantalla.innerHTML = 0
    operador = valor
    pantallaAuxiliar.innerHTML=pantallaAuxiliar.innerHTML + valor
}

//Guardar valores en pila
function agregarPila(valor) {
    if (valorPila === null) {
        valorPila = valor
    }
    else {
        valorPila = calcular(valorPila, operador, valor)
    }
    pantallaAuxiliar.innerHTML=valorPila
}

//Función para calcular según el tipo de operador
function calcular(valor1, operador, valor2) {
    let resultado = 0
    switch (operador) {
        case "*":
            resultado = Number(valor1) * Number(valor2)
            break
        case "+":
            resultado = Number(valor1) + Number(valor2)
            break
        case "-":
            resultado = Number(valor1) - Number(valor2)
            break
        case "/":
            resultado = Number(valor1) / Number(valor2)
            break
    }
    return resultado
}

function clickIgual() {
    let resultadoFinal
    resultadoFinal = calcular(valorPila, operador, valorPantalla.innerHTML)
    if (String(resultadoFinal).length > 9 || isNaN(resultadoFinal)) {
        valorPantalla.innerHTML = "ERR!"
        pantallaAuxiliar.innerHTML=""
    }
    else {
        pantallaAuxiliar.innerHTML=pantallaAuxiliar.innerHTML+valorPantalla.innerHTML
        valorPantalla.innerHTML = resultadoFinal
    }
    valorPila = null
    modoEscritura = true
}