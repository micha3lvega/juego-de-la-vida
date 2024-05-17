// Variables globales
let ctx;
let canvas;
const fps = 30;
const canvasX = 500; // ancho del canvas en pixeles
const canvasY = 500; // alto del canvas en pixeles
let tileX, tileY;
const filas = 100;
const columnas = 100;
const negro = '#000000';
const blanco = '#FFFFFF';
let tablero = inicializarTablero(filas, columnas);

// Inicializa el canvas y empieza el juego
function init() {
    canvas = document.getElementById('pantalla');
    ctx = canvas.getContext('2d');
    canvas.width = canvasX;
    canvas.height = canvasY;
    tileX = Math.floor(canvasX / filas);
    tileY = Math.floor(canvasY / columnas);
    iniciarTablero();
    setInterval(mutar, 1000 / fps);
}

// Inicializa un tablero de celdas
function inicializarTablero(filas, columnas) {
    const array = new Array(filas);
    for (let y = 0; y < filas; y++) {
        array[y] = new Array(columnas).fill(null);
    }
    return array;
}

// Inicia el tablero con células aleatorias
function iniciarTablero() {
    for (let y = 0; y < filas; y++) {
        for (let x = 0; x < columnas; x++) {
            const estado = Math.floor(Math.random() * 2);
            tablero[x][y] = new Celula(x, y, estado);
            dibujarCelda(x, y, estado ? blanco : negro);
        }
    }
}

// Representa una celula
function Celula(x, y, estado) {
    this.x = x;
    this.y = y;
    this.isAlive = estado === 1;
}

// Calcula el nuevo estado del tablero
function mutar() {
    const nuevasCelulas = inicializarTablero(filas, columnas);
    for (let y = 0; y < filas; y++) {
        for (let x = 0; x < columnas; x++) {
            nuevasCelulas[x][y] = calculaNuevoEstado(x, y);
        }
    }
    tablero = nuevasCelulas;
    redibujarTablero();
}

// Calcula el nuevo estado de una celula basándose en sus vecinos
function calculaNuevoEstado(x, y) {
    const celula = tablero[x][y];
    const celulasVecinasVivas = contarVecinosVivos(x, y);
    const nuevoEstado = calcularNuevoEstado(celula.isAlive, celulasVecinasVivas);
    return new Celula(x, y, nuevoEstado);
}

// Cuenta los vecinos vivos de una celula
function contarVecinosVivos(x, y) {
    let contador = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const xVecino = (x + i + columnas) % columnas;
            const yVecino = (y + j + filas) % filas;
            if (tablero[xVecino][yVecino].isAlive) {
                contador++;
            }
        }
    }
    return contador;
}

// Calcula el nuevo estado basado en las reglas de Conway
function calcularNuevoEstado(isAlive, vecinosVivos) {
    if (isAlive) {
        return vecinosVivos === 2 || vecinosVivos === 3;
    }
    return vecinosVivos === 3;
}

// Redibuja el tablero en el canvas
function redibujarTablero() {
    limpiarTablero();
    for (let y = 0; y < filas; y++) {
        for (let x = 0; x < columnas; x++) {
            const celula = tablero[x][y];
            dibujarCelda(x, y, celula.isAlive ? blanco : negro);
        }
    }
}

// Dibuja una celda en el canvas
function dibujarCelda(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * tileX, y * tileY, tileX, tileY);
}

// Limpia el canvas
function limpiarTablero() {
    ctx.clearRect(0, 0, canvasX, canvasY);
}

// Iniciar el juego
window.onload = init;
