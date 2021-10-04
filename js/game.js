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
var filas = 10;
var columnas = 10;

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