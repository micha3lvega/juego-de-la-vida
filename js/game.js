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

var Celula = function (valorX, valorY, estado) {

    this.posicionX = valorX;
    this.posicionY = valorY;
    this.isAlive = estado == 1; // Vivo 1, Muerto = 0

}

console.log(':)');