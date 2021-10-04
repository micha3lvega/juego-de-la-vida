// Variables globales
var ctx;
var canvas;
var fps = 3;

// Pixeles
var canvasX = 500; //pixels ancho
var canvasY = 500; //pixels alto
var tileX, tileY;

//Variables relacionadas con el tablero de juego
var tablero;
var filas = 100;
var columnas = 100;

var negro = '#000000';
var blanco = '#FFFFFF';

var celulas = inicializarCelulas(filas, columnas);

var Celula = function (valorX, valorY, estado) {

    this.posicionX = valorX;
    this.posicionY = valorY;
    this.isAlive = estado == 1; // Vivo 1, Muerto = 0

}

function init() {

    // Asociamos el canvas
    canvas = document.getElementById('pantalla');
    ctx = canvas.getContext('2d');

    // Ajustamos el tamaño del canvas
    canvas.width = canvasX;
    canvas.height = canvasY;

    // Calculamos los tamaños de los lados rectangulos
    tileX = Math.floor(canvasX / filas);
    tileY = Math.floor(canvasY / columnas);

    iniciarTablero();

}


function mutacion() {

    // Generar un arreglo vacio segun el numero de filas y columnas
    var nuevasCelulas = inicializarCelulas(filas, columnas);

    // Recorrer las filas
    for (y = 0; y < filas; y++) {

        // Recorrer las columnas
        for (x = 0; x < columnas; x++) {

            // En el arreglo segun la fila y la columna agregar una celula con el nuevo estado
            nuevasCelulas[x][y] = calculaNuevoEstado(x, y);

        }

    }

    // Retornar un nuevo arreglo con las celulas, pero con el estado actualizado segun las reglas de Conway
    return nuevasCelulas;

}

function iniciarTablero() {

    // Recorrer las filas del tablero
    for (y = 0; y < filas; y++) {

        // Recorrer las columnas de cada fila
        for (x = 0; x < columnas; x++) {

            // Crear una celula con un estado al azar
            let celula = new Celula(x, y, Math.floor(Math.random() * 2));

            // Dibujar la celula con el color correspondiente
            if (celula.isAlive) { // Blanco para las celulas vivas
                this.dibujarCelda((this.y * tileY), (this.x * tileX), tileX, tileY, blanco);
            } else { // Negro para las muertas
                this.dibujarCelda((this.y * tileY), (this.x * tileX), tileX, tileY, negro);
            }

            this.celulas[x][y] = celula;
        }

    }

}

function calculaNuevoEstado(x, y) {

    // Obtener la celula segun la posicion 
    let celula = this.celulas[x][y];

    // Obtener el numero de celulas vivas a su alrededor
    let celulasVecinasVivas = contarVecinoVivos(celula);

    // Generar un nuevo estado segun el numero celulas vivas a su alrededor
    let nuevoEstado = calcularNuevoEstado(celula.isAlive, celulasVecinasVivas);

    // Retornar una nueva celula con las coordenadas recibidas, pero con el nuevo estado
    return nuevaCelula = new Celula(x, y, nuevoEstado);

}

function contarVecinoVivos(celula) {

    /*
    [X-1,Y-1]	[X+0,Y-1]	[X+1,Y-1]
    [X-1,Y+0]	[X+0,Y+0]	[X+1,Y+0]
    [X-1,Y+1]	[X+0,Y+1]	[X+1,Y+1]
    */
    let contadorDeCelulasVivas = 0;

    // Recorrer los vecinos en el eje X
    for (let x = (celula.posicionX - 1); x < (celula.posicionX + 2); x++) {

        // Recorrer los vecinos en el eje Y
        for (let y = (celula.posicionY - 1); y < (celula.posicionY + 2); y++) {

            // Si la celula esta al borde del tablero tomar los del otro lado para dar la sensacion de un mundo circular
            let xVecino = (celula.posicionX + x + columnas) % columnas;
            let yVecino = (celula.posicionY + y + filas) % filas;

            // Recuperar la celula vecina
            let vecino = this.celulas[xVecino][yVecino];

            // Segun el estado sumar o no al contador
            if (vecino.isAlive) {
                contadorDeCelulasVivas++;
            }

        }

    }

    // Como en el recorrido se sumo el valor del propio estado de la celula debe ser restado
    if (celula.isAlive) {
        contadorDeCelulasVivas--;
    }

    return contadorDeCelulasVivas;

}

function calcularNuevoEstado(isAlive, celulasVecinasVivas) {

    // Aplicamos las reglas de Conway

    // Si una célula está viva y tiene dos o tres vecinas vivas, sobrevive.
    if (isAlive) {
        if (celulasVecinasVivas == 2 || celulasVecinasVivas == 3) {
            return true;
        }
    }

    // Si una célula está muerta y tiene tres vecinas vivas, nace.
    if (!isAlive && celulasVecinasVivas == 3) {
        return true;
    }

    // Si una célula está viva y tiene más de tres vecinas vivas, muere.
    if (isAlive && celulasVecinasVivas > 3) {
        return false;
    }

    return isAlive;

}

function redibujarTablero(nuevasCelulas) {

    //Limpiar el tablero
    limpiarTablero();

    // Recorrer las filas
    for (y = 0; y < filas; y++) {

        // Recorrer las columnas de cada fila
        for (x = 0; x < columnas; x++) {

            // Obtener la celula de esa posicion especifica
            var celula = nuevasCelulas[x][y];

            // Dibujar la celula segun su estado
            if (celula.isAlive) {
                this.dibujarCelda((this.y * tileY), (this.x * tileX), tileX, tileY, blanco);
            } else {
                this.dibujarCelda((this.y * tileY), (this.x * tileX), tileX, tileY, negro);
            }

            // Asignar nueva celula al arreglo global
            this.celulas[x][y] = celula;

        }

    }

}


function inicializarCelulas(filas, columnas) {

    var array = new Array(filas);

    for (y = 0; y < filas; y++) {
        array[y] = new Array(columnas);
    }

    return array;
}

function dibujarCelda(ejeX, ejeY, tamX, tamY, color) {
    ctx.fillStyle = color;
    ctx.fillRect(ejeX, ejeY, tamX, tamY);
}

function limpiarTablero() {
    canvas.width = canvas.width;
    canvas.height = canvas.height;
}